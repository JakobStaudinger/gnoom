import {
  AccumulatorExpression,
  EvaluateAccumulatorExpression
} from '../accumulators';
import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { Simplify } from '../types/simplify';

export interface $group<State extends AggregateState> {
  $group: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Simplify<Output<State, S>>>;
}

type Specification<State extends AggregateState> = {
  _id: AggregateExpression<State>;
} & Record<string, AggregateExpression<State> | AccumulatorExpression<State>>;

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: {
      _id: EvaluateAggregateExpression<State, S['_id']>;
    } & {
      [K in Exclude<keyof S, '_id'>]: EvaluateAccumulatorExpression<
        State,
        S[K]
      >;
    };
  }
>;
