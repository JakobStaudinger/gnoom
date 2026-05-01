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

export interface BucketAutoStage<State extends AggregateState> {
  $bucketAuto: <const S extends BucketAutoSpecification<State>>(
    specification: S
  ) => Aggregate<BucketAutoOutput<State, S>>;
}

interface BucketAutoSpecification<State extends AggregateState> {
  groupBy: AggregateExpression<State>;
  buckets: number;
  output?: {
    [K in string]: AccumulatorExpression<State>;
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
  State extends AggregateState,
  S extends BucketAutoSpecification<State>
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
