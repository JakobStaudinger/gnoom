import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';

export interface ReplaceRootStage<T extends object> {
  $replaceRoot: <const S extends ReplaceRootSpecification<T>>(specification: {
    newRoot: S;
  }) => Aggregate<ReplaceRootOutput<T, S>>;
  $replaceWith: <const S extends ReplaceRootSpecification<T>>(
    specification: S
  ) => Aggregate<ReplaceRootOutput<T, S>>;
}

export type ReplaceRootSpecification<T extends object> = {
  [K in string]: AggregateExpression<T, unknown>;
};

export type ReplaceRootOutput<
  T extends object,
  S extends ReplaceRootSpecification<T>
> = {
  -readonly [K in keyof S]: EvaluateAggregateExpression<T, S[K]>;
};
