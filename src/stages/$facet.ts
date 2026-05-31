import { Aggregate } from '../aggregate';
import { AggregateLike } from '../types/aggregate-like';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { PipelineCallback } from '../types/pipeline';
import { Simplify } from '../types/simplify';

export interface $facet<State extends AggregateState> {
  $facet: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Simplify<Output<State, S>>>;
}

type Specification<State extends AggregateState> = {
  [K in string]: PipelineCallback<State['T']>;
};

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: {
      -readonly [K in keyof S]: S[K] extends (
        ...args: infer _Args
      ) => AggregateLike<infer O>
        ? O['T'][]
        : never;
    };
  }
>;
