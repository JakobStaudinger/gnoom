import { AllStages } from './stages';

export interface Aggregate<T extends object> extends AllStages<T> {
  toArray(): unknown[];
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
          return (spec: unknown) =>
            constructAggregate([...stages, { [stageName]: spec }]);
        }

        return Reflect.get(target, property, receiver);
      }
    }
  ) as Aggregate<T>;
}

export function aggregate<T extends object>(): Aggregate<T> {
  return constructAggregate([]);
}
