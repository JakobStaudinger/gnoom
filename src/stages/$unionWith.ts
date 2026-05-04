import { Aggregate } from '../aggregate';
import { AggregateLike } from '../types/aggregate-like';
import { AggregateState, WithType } from '../types/aggregate-state';
import { PipelineCallback } from '../types/pipeline';

export interface $unionWith<State extends AggregateState> {
  $unionWith: <Other extends object>() => <
    const S extends Specification<Other>
  >(
    specification: S
  ) => Aggregate<Output<State, Other, S>>;
}

type Specification<Other extends object> =
  | {
      coll: string;
      pipeline?: PipelineCallback<Other>;
    }
  | {
      pipeline: PipelineCallback<Other>;
    };

type Output<
  State extends AggregateState,
  Other extends object,
  S extends Specification<Other>
> = WithType<
  State,
  | State['T']
  | ('pipeline' extends keyof S
      ? S['pipeline'] extends (...args: infer _Args) => AggregateLike<infer O>
        ? O['T']
        : never
      : Other)
>;
