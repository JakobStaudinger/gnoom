import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';
import { AggregateState, WithType } from '../types/aggregate-state';

export interface $replaceRoot<State extends AggregateState> {
  $replaceRoot: <const S extends Specification<State>>(specification: {
    newRoot: S;
  }) => Aggregate<Output<State, S>>;
  $replaceWith: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Output<State, S>>;
}

type Specification<State extends AggregateState> = {
  [K in string]: AggregateExpression<State>;
};

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = WithType<
  State,
  { -readonly [K in keyof S]: EvaluateAggregateExpression<State, S[K]> }
>;
