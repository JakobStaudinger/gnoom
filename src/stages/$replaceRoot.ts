import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';
import { AggregateState, WithType } from '../types/aggregate-state';

export interface ReplaceRootStage<State extends AggregateState> {
  $replaceRoot: <
    const S extends ReplaceRootSpecification<State>
  >(specification: {
    newRoot: S;
  }) => Aggregate<ReplaceRootOutput<State, S>>;
  $replaceWith: <const S extends ReplaceRootSpecification<State>>(
    specification: S
  ) => Aggregate<ReplaceRootOutput<State, S>>;
}

type ReplaceRootSpecification<State extends AggregateState> = {
  [K in string]: AggregateExpression<State>;
};

type ReplaceRootOutput<
  State extends AggregateState,
  S extends ReplaceRootSpecification<State>
> = WithType<
  State,
  { -readonly [K in keyof S]: EvaluateAggregateExpression<State, S[K]> }
>;
