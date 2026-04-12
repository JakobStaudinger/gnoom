import {
  AccumulatorExpression,
  EvaluateAccumulatorExpression
} from '../accumulators';
import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';

export interface BucketStage<T extends object> {
  $bucket: <const S extends BucketSpecification<T>>(
    specification: S
  ) => Aggregate<BucketOutput<T, S>>;
}

interface BucketSpecification<T extends object> {
  groupBy: AggregateExpression<T, unknown>;
  boundaries: unknown[];
  default?: unknown;
  output?: {
    [K in string]: AccumulatorExpression<T>;
  };
}

type BucketOutput<T extends object, S extends BucketSpecification<T>> = {
  _id: EvaluateAggregateExpression<T, S['groupBy']>;
} & {
  -readonly [K in keyof S['output']]: EvaluateAccumulatorExpression<
    T,
    S['output'][K]
  >;
};
