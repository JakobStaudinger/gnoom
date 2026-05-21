import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';

export interface $sortByCount<State extends AggregateState> {
  $sortByCount: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Output<State, S>>;
}

type Specification<State extends AggregateState> = AggregateExpression<State>;

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: { _id: EvaluateAggregateExpression<State, S>; count: number };
  }
>;
