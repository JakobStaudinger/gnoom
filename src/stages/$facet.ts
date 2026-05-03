import { Aggregate } from '../aggregate';
import { AggregateLike } from '../types/aggregate-like';
import { AggregateState, WithType } from '../types/aggregate-state';
import { PipelineCallback } from '../types/pipeline';

export interface $facet<State extends AggregateState> {
  $facet: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Output<State, S>>;
}

type Specification<State extends AggregateState> = {
  [K in string]: PipelineCallback<State['T']>;
};

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = WithType<
  State,
  {
    -readonly [K in keyof S]: S[K] extends (
      ...args: infer _Args
    ) => AggregateLike<infer Output>
      ? Output['T'][]
      : never;
  }
>;
