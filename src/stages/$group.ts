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

export interface $group<State extends AggregateState> {
  $group: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Output<State, S>>;
}

type Specification<State extends AggregateState> = {
  _id: AggregateExpression<State>;
} & Record<string, AggregateExpression<State> | AccumulatorExpression<State>>;

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = WithType<
  State,
  {
    _id: EvaluateAggregateExpression<State, S['_id']>;
  } & {
    [K in Exclude<keyof S, '_id'>]: EvaluateAccumulatorExpression<State, S[K]>;
  }
>;
