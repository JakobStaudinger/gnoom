import { Aggregate } from '../aggregate';
import { AggregateLike } from '../types/aggregate-like';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { PipelineCallback } from '../types/pipeline';
import { Simplify } from '../types/simplify';
import { WithoutFunctions } from '../types/without-functions';

export interface $unionWith<State extends AggregateState> {
  $unionWith: <Other extends object>() => <
    const S extends Specification<WithoutFunctions<Other>>
  >(
    specification: S
  ) => Aggregate<Simplify<Output<State, WithoutFunctions<Other>, S>>>;
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
> = AddStage<
  State,
  {
    T:
      | State['T']
      | ('pipeline' extends keyof S
          ? S['pipeline'] extends (
              ...args: infer _Args
            ) => AggregateLike<infer O>
            ? O['T']
            : never
          : Other);
  }
>;
