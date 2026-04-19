import {
  AccumulatorExpression,
  EvaluateAccumulatorExpression
} from '../accumulators';
import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';

export interface BucketAutoStage<T extends object> {
  $bucketAuto: <const S extends BucketAutoSpecification<T>>(
    specification: S
  ) => Aggregate<BucketAutoOutput<T, S>>;
}

interface BucketAutoSpecification<T extends object> {
  groupBy: AggregateExpression<T>;
  buckets: number;
  output?: {
    [K in string]: AccumulatorExpression<T>;
  };
  granularity?: BucketGranularity;
}

type BucketGranularity =
  | 'R5'
  | 'R10'
  | 'R20'
  | 'R40'
  | 'R80'
  | '1-2-5'
  | 'E6'
  | 'E12'
  | 'E24'
  | 'E48'
  | 'E96'
  | 'E192'
  | 'POWERSOF2';

type BucketAutoOutput<
  T extends object,
  S extends BucketAutoSpecification<T>
> = {
  _id: EvaluateAggregateExpression<T, S['groupBy']>;
} & {
  -readonly [K in keyof S['output']]: EvaluateAccumulatorExpression<
    T,
    S['output'][K]
  >;
};
