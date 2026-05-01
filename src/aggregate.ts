import { AggregationCursor } from 'mongodb';
import { AllStages } from './stages';
import {
  AggregateState,
  InitialState,
  WithType
} from './types/aggregate-state';
import { PipelineCallback } from './types/pipeline';
import { Merge } from './types/merge';

const OUTPUT_TYPE = Symbol('OutputType');

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

interface AggregateBase<State extends AggregateState> {
  toArray(): AggregatePipeline<State>;
  execute(fn: ExecuteFunction<State>): Promise<State['T'][]>;
  execute(client: { aggregate: ExecuteFunction<State> }): Promise<State['T'][]>;
  custom(stage: unknown): Aggregate<State>;
  addToType<A extends object>(
    value?: A
  ): Aggregate<WithType<State, Merge<State['T'], A>>>;
  removeFromType<const K extends keyof State['T']>(
    keys?: K
  ): Aggregate<WithType<State, Omit<State['T'], K>>>;
  replaceType<N extends object>(newValue?: N): Aggregate<WithType<State, N>>;
  modifyType<Fn extends (obj: State['T']) => object>(
    callback: Fn
  ): Aggregate<WithType<State, ReturnType<Fn>>>;
}

export interface Aggregate<State extends AggregateState>
  extends AggregateBase<State>, AllStages<State> {}

function constructAggregate<State extends AggregateState>(
  stages: unknown[]
): Aggregate<State> {
  return new Proxy(
    {
      toArray() {
        return stages as AggregatePipeline<State>;
      },
      execute(fnOrClient) {
        const fn =
          typeof fnOrClient === 'function'
            ? fnOrClient
            : fnOrClient.aggregate.bind(fnOrClient);

        const result = fn(this.toArray());

        if ('toArray' in result) {
          return result.toArray();
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
      replaceType<R extends object>(this: Aggregate<WithType<State, R>>) {
        return this;
      },
      modifyType<Fn extends (obj: State['T']) => object>(
        this: Aggregate<WithType<State, ReturnType<Fn>>>
      ) {
        return this;
      }
    } satisfies AggregateBase<State> as unknown as Aggregate<State>,
    {
      get(target, property, receiver) {
        if (typeof property === 'string' && property.startsWith('$')) {
          const stageName = property as keyof AllStages<State>;

          const fn = (spec: unknown) =>
            constructAggregate([...stages, { [stageName]: processSpec(spec) }]);
          // extra function call needed to be able to pass the type of the joined collection
          const specialStages = [
            '$lookup',
            '$graphLookup',
            '$unionWith',
            '$merge',
            '$out'
          ];

          if (specialStages.includes(stageName)) {
            return () => fn;
          }

          return fn;
        }

        return Reflect.get(target, property, receiver);
      }
    }
  );
}

export function aggregate<T extends object>(): Aggregate<InitialState<T>> {
  return constructAggregate([]);
}

function processSpec(spec: unknown) {
  if (isObject(spec)) {
    for (const prop of Object.keys(spec) as (keyof typeof spec)[]) {
      if (typeof spec[prop] === 'function') {
        const fn = spec[prop] as PipelineCallback<object>;
        const result = fn(aggregate());
        spec[prop] = Array.isArray(result) ? result : result.toArray();
      }
    }
  }

  return spec;
}

function isObject(spec: unknown): spec is Record<string, unknown> {
  return typeof spec === 'object' && spec != null;
}
