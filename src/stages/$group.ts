import {
  AccumulatorExpression,
  EvaluateAccumulatorExpression
} from '../accumulators';
import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  UnconstrainedAggregateExpression
} from '../expressions';

export interface GroupStage<T extends object> {
  $group: <const S extends GroupSpecification<T>>(
    specification: S
  ) => Aggregate<GroupOutput<T, S>>;
}

export type GroupSpecification<T extends object> = {
  _id: UnconstrainedAggregateExpression<T>;
} & Record<
  string,
  UnconstrainedAggregateExpression<T> | AccumulatorExpression<T>
>;

type GroupOutput<T extends object, S extends GroupSpecification<T>> = {
  _id: EvaluateAggregateExpression<T, S['_id']>;
} & {
  [K in Exclude<keyof S, '_id'>]: EvaluateAccumulatorExpression<T, S[K]>;
};
