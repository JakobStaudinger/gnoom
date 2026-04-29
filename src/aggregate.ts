import { AggregationCursor } from 'mongodb';
import { AllStages } from './stages';
import { AggregateState, InitialState } from './types/aggregate-state';
import { Merge } from './types/merge';
import { PipelineCallback } from './types/pipeline';

const OUTPUT_TYPE = Symbol('OutputType');

export interface AggregatePipeline<T> extends Array<object> {
  [OUTPUT_TYPE]?: T;
}

interface ExecuteFunction<T extends object> {
  (pipeline: AggregatePipeline<T>): Promise<T[]> | AggregationCursor<T>;
}

interface AggregateBase<T extends object> {
  toArray(): AggregatePipeline<T>;
  execute(fn: ExecuteFunction<T>): Promise<T[]>;
  execute(client: { aggregate: ExecuteFunction<T> }): Promise<T[]>;
  custom(stage: unknown): Aggregate<T>;
  addToType<A extends object>(value?: A): Aggregate<Merge<T, A>>;
  removeFromType<const K extends keyof T>(keys?: K): Aggregate<Omit<T, K>>;
  replaceType<N extends object>(newValue?: N): Aggregate<N>;
  modifyType<Fn extends (obj: T) => object>(
    callback: Fn
  ): Aggregate<ReturnType<Fn>>;
}

export interface Aggregate<
  T extends object,
  State extends AggregateState = { hasStage: true; isNestedPipeline: false }
>
  extends AggregateBase<T>, AllStages<T, State> {}

function constructAggregate<T extends object, State extends AggregateState>(
  stages: unknown[]
): Aggregate<T, State> {
  return new Proxy(
    {
      toArray() {
        return stages as AggregatePipeline<T>;
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
      custom(stage: unknown): Aggregate<T> {
        return constructAggregate([...stages, stage]);
      },
      addToType<A extends object>(this: Aggregate<Merge<T, A>>) {
        return this;
      },
      removeFromType<K extends PropertyKey>(this: Aggregate<Omit<T, K>>) {
        return this;
      },
      replaceType<R extends object>(this: Aggregate<R>) {
        return this;
      },
      modifyType<Fn extends (obj: T) => object>(
        this: Aggregate<ReturnType<Fn>>
      ) {
        return this;
      }
    } satisfies AggregateBase<T> as unknown as Aggregate<T, State>,
    {
      get(target, property, receiver) {
        if (typeof property === 'string' && property.startsWith('$')) {
          const stageName = property as keyof AllStages<T, State>;

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

export function aggregate<T extends object>(): Aggregate<T, InitialState> {
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
