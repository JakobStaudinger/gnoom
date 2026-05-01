import { Aggregate } from '../aggregate';
import { AggregateLike } from '../types/aggregate-like';
import { AggregateState, WithType } from '../types/aggregate-state';
import { PipelineCallback } from '../types/pipeline';

export interface FacetStage<State extends AggregateState> {
  $facet: <const S extends FacetSpecification<State>>(
    specification: S
  ) => Aggregate<FacetOutput<State, S>>;
}

type FacetSpecification<State extends AggregateState> = {
  [K in string]: PipelineCallback<State['T']>;
};

type FacetOutput<
  State extends AggregateState,
  S extends FacetSpecification<State>
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
