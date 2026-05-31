import {
  AccumulatorExpression,
  EvaluateAccumulatorExpression
} from '../accumulators';
import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { Simplify } from '../types/simplify';

export interface $bucket<State extends AggregateState> {
  $bucket: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Simplify<Output<State, S>>>;
}

interface Specification<State extends AggregateState> {
  groupBy: AggregateExpression<State>;
  boundaries: [unknown, unknown, ...unknown[]];
  default?: unknown;
  output?: {
    [K in string]: AccumulatorExpression<State>;
  };
}

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: {
      _id: EvaluateAggregateExpression<State, S['groupBy']>;
    } & {
      -readonly [K in keyof S['output']]: EvaluateAccumulatorExpression<
        State,
        S['output'][K]
      >;
    };
  }
>;
