import { AllStages } from './stages';

export const OUTPUT_TYPE = Symbol('OutputType');

export interface AggregatePipeline<T> extends Array<unknown> {
  [OUTPUT_TYPE]?: T;
}

export interface Aggregate<T extends object> extends AllStages<T> {
  toArray(): AggregatePipeline<T>;
  custom<C extends object>(stage: unknown): Aggregate<C>;
}

type PipelineCallback = <T extends object>(
  aggregate: Aggregate<T>
) => Aggregate<object> | AggregatePipeline<unknown>;

function constructAggregate<T extends object>(stages: unknown[]): Aggregate<T> {
  return new Proxy(
    {
      toArray() {
        return stages;
      },
      custom<C extends object>(stage: unknown): Aggregate<C> {
        return constructAggregate([...stages, stage]);
      }
    } satisfies Pick<Aggregate<T>, 'toArray' | 'custom'> as Aggregate<T>,
    {
      get(target, property, receiver) {
        if (typeof property === 'string' && property.startsWith('$')) {
          const stageName = property as keyof AllStages<T>;

          const fn = (spec: unknown) => {
            constructAggregate([...stages, { [stageName]: processSpec(spec) }]);
          };

          // extra function call needed to be able to pass the type of the joined collection
          if (stageName === '$lookup') {
            return () => fn;
          }

          return fn;
        }

        return Reflect.get(target, property, receiver);
      }
    }
  );
}

export function aggregate<T extends object>(): Aggregate<T> {
  return constructAggregate([]);
}

function processSpec(spec: unknown) {
  if (isObject(spec)) {
    for (const prop of Object.keys(spec) as (keyof typeof spec)[]) {
      if (typeof spec[prop] === 'function') {
        const fn = spec[prop] as PipelineCallback;
        const result = fn(aggregate());
        spec[prop] = Array.isArray(result) ? result : result.toArray();
      }
    }
  }
}

function isObject(spec: unknown): spec is Record<string, unknown> {
  return typeof spec === 'object' && spec != null;
}
