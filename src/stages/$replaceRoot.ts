import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  UnconstrainedAggregateExpression
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
  [K in string]: UnconstrainedAggregateExpression<T>;
};

export type ReplaceRootOutput<
  T extends object,
  S extends ReplaceRootSpecification<T>
> = {
  -readonly [K in keyof S]: EvaluateAggregateExpression<T, S[K]>;
};
