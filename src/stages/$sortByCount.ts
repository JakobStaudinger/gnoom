import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';

export interface SortByCountStage<T extends object> {
  $sortByCount: <const S extends SortByCountSpecification<T>>(
    specification: S
  ) => Aggregate<SortByCountOutput<T, S>>;
}

type SortByCountSpecification<T extends object> = AggregateExpression<
  T,
  unknown
>;

type SortByCountOutput<
  T extends object,
  S extends SortByCountSpecification<T>
> = { _id: EvaluateAggregateExpression<T, S>; count: number };
