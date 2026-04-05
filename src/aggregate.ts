import { AllStages } from './stages';

type PipelineStageName = `$${string}`;
type UntypedStage = {
  [K in PipelineStageName]: (spec: unknown) => Aggregate<object>;
};

type Stages<T extends object> = AllStages<T> & UntypedStage;

export type AggregateBase = {
  toArray(): unknown[];
};

export type Aggregate<T extends object> = AggregateBase & Stages<T>;

function constructAggregate<T extends object>(stages: unknown[]): Aggregate<T> {
  return new Proxy(
    {
      toArray() {
        return stages;
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
  ) satisfies AggregateBase as Aggregate<T>;
}

export function aggregate<T extends object>(): Aggregate<T> {
  return constructAggregate([]);
}
