import {
  AccumulatorExpression,
  EvaluateAccumulatorExpression
} from '../accumulators';
import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';
import { AggregateState, WithType } from '../types/aggregate-state';

export interface GroupStage<State extends AggregateState> {
  $group: <const S extends GroupSpecification<State>>(
    specification: S
  ) => Aggregate<GroupOutput<State, S>>;
}

type GroupSpecification<State extends AggregateState> = {
  _id: AggregateExpression<State>;
} & Record<string, AggregateExpression<State> | AccumulatorExpression<State>>;

type GroupOutput<
  State extends AggregateState,
  S extends GroupSpecification<State>
> = WithType<
  State,
  {
    _id: EvaluateAggregateExpression<State, S['_id']>;
  } & {
    [K in Exclude<keyof S, '_id'>]: EvaluateAccumulatorExpression<State, S[K]>;
  }
>;
