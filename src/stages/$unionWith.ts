import { Aggregate, AggregatePipeline } from '../aggregate';

export interface UnionWithStage<T extends object> {
  $unionWith: <Other extends object>() => <
    const S extends UnionWithSpecification<Other>
  >(
    specification: S
  ) => Aggregate<UnionWithOutput<T, Other, S>>;
}

export type UnionWithSpecification<Other extends object> =
  | {
      coll: string;
      pipeline?: (
        aggregate: Aggregate<Other>
      ) => AggregatePipeline<unknown> | Aggregate<object>;
    }
  | {
      pipeline: (
        aggregate: Aggregate<Other>
      ) => AggregatePipeline<unknown> | Aggregate<object>;
    };

export type UnionWithOutput<
  T extends object,
  Other extends object,
  S extends UnionWithSpecification<Other>
> =
  | T
  | ('pipeline' extends keyof S
      ? S['pipeline'] extends (
          ...args: infer _Args
        ) => AggregatePipeline<infer Output> | Aggregate<infer Output>
        ? Output
        : never
      : Other);
