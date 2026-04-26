import { Aggregate } from '../aggregate';
import { AggregateLike } from '../types/aggregate-like';
import { NestedPipelineState } from '../types/aggregate-state';

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
        aggregate: Aggregate<Other, NestedPipelineState>
      ) => AggregateLike<unknown>;
    }
  | {
      pipeline: (
        aggregate: Aggregate<Other, NestedPipelineState>
      ) => AggregateLike<unknown>;
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
        ) => AggregateLike<infer Output extends object>
        ? Output
        : never
      : Other);
