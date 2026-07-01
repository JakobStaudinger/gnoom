import { AggregationCursor } from 'mongodb';
import { AllStages } from './stages';
import {
  AggregateState,
  InitialState,
  SystemVariables,
  WithType
} from './types/aggregate-state';
import { AssertNoErrorState } from './types/error';
import { Merge } from './types/merge';
import { PipelineCallback } from './types/pipeline';
import { Simplify } from './types/simplify';
import { WithoutFunctions } from './types/without-functions';

declare const OUTPUT_TYPE: unique symbol;

export interface AggregatePipeline<
  State extends AggregateState
> extends Array<object> {
  [OUTPUT_TYPE]?: State['T'];
}

interface ExecuteFunction<State extends AggregateState> {
  (
    pipeline: AggregatePipeline<State>
  ): Promise<State['T'][]> | AggregationCursor<State['T']>;
}

interface StreamFunction<State extends AggregateState> {
  (
    pipeline: AggregatePipeline<State>
  ): AggregationCursor<State['T']> | AsyncIterable<State['T']>;
}

interface AggregateBase<State extends AggregateState> {
  with<R>(callback: (p: this) => R): Aggregate<CombineStates<R>>;
  toArray: (...errors: AssertNoErrorState<State>) => AggregatePipeline<State>;
  execute: (
    fnOrClient: ExecuteFunction<State> | { aggregate: ExecuteFunction<State> },
    ...errors: AssertNoErrorState<State>
  ) => Promise<State['T'][]>;
  stream: (
    fnOrClient:
      | StreamFunction<State>
      | {
          aggregate: (pipeline: AggregatePipeline<State>) => {
            stream: () => AsyncIterable<State['T']>;
          };
        },
    ...errors: AssertNoErrorState<State>
  ) => AsyncIterable<State['T']>;
  custom(stage: unknown): Aggregate<State>;
  addToType<A extends object>(
    value?: A
  ): Aggregate<WithType<State, Merge<State['T'], A>>>;
  removeFromType<const K extends keyof State['T']>(
    keys?: K
  ): Aggregate<WithType<State, Omit<State['T'], K>>>;
  modifyType<Fn extends (obj: State['T']) => object>(
    callback?: Fn
  ): Aggregate<WithType<State, ReturnType<Fn>>>;
  inspectError: (...errors: AssertNoErrorState<State>) => this;
}

export interface Aggregate<State extends AggregateState>
  extends AggregateBase<State>, AllStages<State> {}

function constructAggregate<State extends AggregateState>(
  stages: unknown[]
): Aggregate<State> {
  return new Proxy(
    {
      with<R>(callback: (p: Aggregate<State>) => R) {
        return callback(this as Aggregate<State>) as Aggregate<
          CombineStates<R>
        >;
      },
      toArray() {
        return stages as AggregatePipeline<State>;
      },
      execute(
        fnOrClient:
          | ExecuteFunction<State>
          | { aggregate: ExecuteFunction<State> },
        ...args
      ) {
        const fn =
          typeof fnOrClient === 'function'
            ? fnOrClient
            : fnOrClient.aggregate.bind(fnOrClient);

        const result = fn(this.toArray(...args));

        if ('toArray' in result) {
          return result.toArray();
        }

        return result;
      },
      stream(fnOrClient, ...args) {
        const fn =
          typeof fnOrClient === 'function'
            ? fnOrClient
            : fnOrClient.aggregate.bind(fnOrClient);

        const result = fn(this.toArray(...args));

        if ('stream' in result) {
          return result.stream();
        }

        return result;
      },
      custom(stage: unknown): Aggregate<State> {
        return constructAggregate([...stages, stage]);
      },
      addToType<A extends object>(this: Aggregate<WithType<State, A>>) {
        return this;
      },
      removeFromType<K extends PropertyKey>(
        this: Aggregate<WithType<State, Omit<State['T'], K>>>
      ) {
        return this;
      },
      modifyType<Fn extends (obj: State['T']) => object>(
        this: Aggregate<WithType<State, ReturnType<Fn>>>
      ) {
        return this;
      },
      inspectError() {
        return this;
      }
    } satisfies AggregateBase<State> as unknown as Aggregate<State>,
    {
      get(target, property, receiver) {
        if (typeof property === 'string' && property.startsWith('$')) {
          const stageName = property as keyof AllStages<State>;

          const fn = (spec?: unknown) => {
            if (spec != null) {
              return constructAggregate([
                ...stages,
                { [stageName]: processSpec(spec) }
              ]);
            }

            // extra function call needed to be able to partially specify type parameters (e.g. in $lookup)
            return fn;
          };

          return fn;
        }

        return Reflect.get(target, property, receiver);
      }
    }
  );
}

export function aggregate<T extends object>(): Aggregate<
  InitialState<WithoutFunctions<T>>
> {
  return constructAggregate([]);
}

function processSpec(spec: unknown) {
  if (isPlainObject(spec)) {
    for (const prop of Object.keys(spec) as (keyof typeof spec)[]) {
      if (typeof spec[prop] === 'function') {
        const fn = spec[prop] as PipelineCallback<object>;
        const result = fn(aggregate());
        spec[prop] = Array.isArray(result) ? result : result.toArray();
      } else {
        spec[prop] = processSpec(spec[prop]);
      }
    }
  }

  return spec;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype == null || prototype === Object.prototype;
}

type CombineStates<R> = [StateOf<R>] extends [never]
  ? never
  : {
      T: Simplify<CombineTypes<StateOf<R>['T']>>;
      hasStage: CombineHasStage<StateOf<R>>;
      finalStage: CombineFinalStages<StateOf<R>>;
      allowedStages: CombineAllowedStages<StateOf<R>>;
      systemVariables: SystemVariables<Simplify<CombineTypes<StateOf<R>['T']>>>;
    };

type StateOf<T> = T extends Aggregate<infer State> ? State : never;

type CombineTypes<T> = {
  [K in CommonKeys<T>]: ValueOf<T, K>;
} & {
  [K in Exclude<AllKeys<T>, CommonKeys<T>>]?: ValueOf<T, K>;
};

type CommonKeys<T> = {
  [K in AllKeys<T>]: [T] extends [{ [P in K]: unknown }] ? K : never;
}[AllKeys<T>];
type AllKeys<T> = T extends unknown ? keyof T : never;
type ValueOf<T, K extends PropertyKey> = T extends unknown
  ? K extends keyof T
    ? T[K]
    : never
  : never;

type CombineHasStage<T> = [T] extends [{ hasStage: false }] ? false : true;
type CombineFinalStages<T> = T extends { finalStage: infer F } ? F : never;
type CombineAllowedStages<T> = T extends { allowedStages: infer S } ? S : never;
