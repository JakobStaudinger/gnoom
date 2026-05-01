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

export interface BucketStage<State extends AggregateState> {
  $bucket: <const S extends BucketSpecification<State>>(
    specification: S
  ) => Aggregate<BucketOutput<State, S>>;
}

interface BucketSpecification<State extends AggregateState> {
  groupBy: AggregateExpression<State>;
  boundaries: [unknown, unknown, ...unknown[]];
  default?: unknown;
  output?: {
    [K in string]: AccumulatorExpression<State>;
  };
}

type BucketOutput<
  State extends AggregateState,
  S extends BucketSpecification<State>
> = WithType<
  State,
  {
    _id: EvaluateAggregateExpression<State, S['groupBy']>;
  } & {
    -readonly [K in keyof S['output']]: EvaluateAccumulatorExpression<
      State,
      S['output'][K]
    >;
  }
>;
