import { AllStages } from './stages';

type Specification<T> = T extends { specification: infer S } ? S : never;
type Output<T> = T extends { output: infer O extends object } ? O : never;

type Stages<T extends object> = {
  [K in keyof AllStages<T>]: (
    spec: Specification<AllStages<T>[K]>
  ) => Aggregate<Output<AllStages<T>[K]>>;
} & UntypedStage;

type PipelineStage = `$${string}`;
type UntypedStage = {
  [K in PipelineStage]-?: (spec: unknown) => Aggregate<object>;
};

export type AggregateBase = {
  finalize(): unknown[];
};

export type Aggregate<T extends object> = AggregateBase & Stages<T>;

function constructAggregate<T extends object>(stages: unknown[]): Aggregate<T> {
  return new Proxy(
    {
      finalize() {
        return stages;
      }
    },
    {
      get(target, property, receiver) {
        if (typeof property === 'string' && property.startsWith('$')) {
          const stageName = property as keyof AllStages<T>;
          return (spec: unknown) => {
            return constructAggregate([...stages, { [stageName]: spec }]);
          };
        }

        return Reflect.get(target, property, receiver);
      }
    }
  ) satisfies AggregateBase as Aggregate<T>;
}

export function aggregate<T extends object>(): Aggregate<T> {
  return constructAggregate([]);
}
