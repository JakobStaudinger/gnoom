import { AllStages } from './stages';

export const OUTPUT_TYPE = Symbol('OutputType');

export interface AggregatePipeline<T> extends Array<unknown> {
  [OUTPUT_TYPE]?: T;
}

export interface Aggregate<T extends object> extends AllStages<T> {
  toArray(): AggregatePipeline<T>;
  custom<C extends object>(stage: unknown): Aggregate<C>;
}

function constructAggregate<T extends object>(stages: unknown[]): Aggregate<T> {
  return new Proxy(
    {
      toArray() {
        return stages;
      },
      custom<C extends object>(stage: unknown): Aggregate<C> {
        return constructAggregate([...stages, stage]);
      }
    },
    {
      get(target, property, receiver) {
        if (typeof property === 'string' && property.startsWith('$')) {
          const stageName = property as keyof AllStages<T>;
          const fn = (spec: unknown) =>
            constructAggregate([...stages, { [stageName]: spec }]);

          // extra function call needed to be able to pass the type of the joined collection
          if (property === '$lookup') {
            return () => fn;
          }

          return fn;
        }

        return Reflect.get(target, property, receiver);
      }
    }
  ) as Aggregate<T>;
}

export function aggregate<T extends object>(): Aggregate<T> {
  return constructAggregate([]);
}
