import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';
import { AggregateState, WithType } from '../types/aggregate-state';

export interface SortByCountStage<State extends AggregateState> {
  $sortByCount: <const S extends SortByCountSpecification<State>>(
    specification: S
  ) => Aggregate<SortByCountOutput<State, S>>;
}

type SortByCountSpecification<State extends AggregateState> =
  AggregateExpression<State>;

type SortByCountOutput<
  State extends AggregateState,
  S extends SortByCountSpecification<State>
> = WithType<
  State,
  { _id: EvaluateAggregateExpression<State, S>; count: number }
>;
