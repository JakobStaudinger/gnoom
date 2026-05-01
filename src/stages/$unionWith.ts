import { Aggregate } from '../aggregate';
import { AggregateLike } from '../types/aggregate-like';
import { AggregateState, WithType } from '../types/aggregate-state';
import { PipelineCallback } from '../types/pipeline';

export interface UnionWithStage<State extends AggregateState> {
  $unionWith: <Other extends object>() => <
    const S extends UnionWithSpecification<Other>
  >(
    specification: S
  ) => Aggregate<UnionWithOutput<State, Other, S>>;
}

type UnionWithSpecification<Other extends object> =
  | {
      coll: string;
      pipeline?: PipelineCallback<Other>;
    }
  | {
      pipeline: PipelineCallback<Other>;
    };

type UnionWithOutput<
  State extends AggregateState,
  Other extends object,
  S extends UnionWithSpecification<Other>
> = WithType<
  State,
  | State['T']
  | ('pipeline' extends keyof S
      ? S['pipeline'] extends (
          ...args: infer _Args
        ) => AggregateLike<infer Output>
        ? Output['T']
        : never
      : Other)
>;
