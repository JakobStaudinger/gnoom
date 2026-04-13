import { AllStages } from './stages';
import { LookupSpecification } from './stages/$lookup';

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
    } satisfies Pick<Aggregate<T>, 'toArray' | 'custom'> as Aggregate<T>,
    {
      get(target, property, receiver) {
        if (typeof property === 'string' && property.startsWith('$')) {
          const stageName = property as keyof AllStages<T>;
          // extra function call needed to be able to pass the type of the joined collection
          if (stageName === '$lookup') {
            return () => handleLookup(stages);
          }

          return (spec: unknown) =>
            constructAggregate([...stages, { [stageName]: spec }]);
        }

        return Reflect.get(target, property, receiver);
      }
    }
  );
}

export function aggregate<T extends object>(): Aggregate<T> {
  return constructAggregate([]);
}

function handleLookup<T extends object>(stages: unknown[]) {
  return ({
    pipeline: createPipeline,
    ...spec
  }: LookupSpecification<T, object>) => {
    const pipeline = (() => {
      if (!createPipeline) {
        return undefined;
      }

      const result = createPipeline(aggregate());
      return Array.isArray(result) ? result : result.toArray();
    })();

    const newStageSpecification = pipeline ? { ...spec, pipeline } : spec;
    return constructAggregate([
      ...stages,
      [{ $lookup: newStageSpecification }]
    ]);
  };
}
