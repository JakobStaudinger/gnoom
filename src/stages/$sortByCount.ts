import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';
import { AggregateState, WithType } from '../types/aggregate-state';

export interface $sortByCount<State extends AggregateState> {
  $sortByCount: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Output<State, S>>;
}

type Specification<State extends AggregateState> = AggregateExpression<State>;

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = WithType<
  State,
  { _id: EvaluateAggregateExpression<State, S>; count: number }
>;
