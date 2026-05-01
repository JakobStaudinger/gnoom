import { Aggregate } from '../aggregate';
import { AggregateState, WithType } from '../types/aggregate-state';

export interface CountStage<State extends AggregateState> {
  $count: <const S extends CountSpecification>(
    specification: S
  ) => Aggregate<CountOutput<State, S>>;
}

type CountSpecification = string;

type CountOutput<
  State extends AggregateState,
  S extends CountSpecification
> = WithType<State, { [K in S]: number }>;
