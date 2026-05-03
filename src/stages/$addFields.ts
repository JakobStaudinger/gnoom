import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AggregateState, WithType } from '../types/aggregate-state';
import { Merge } from '../types/merge';

export interface $addFields<State extends AggregateState> {
  $addFields: Signature<State>;
  $set: Signature<State>;
}

type Signature<State extends AggregateState> = <
  const S extends Specification<State>
>(
  specification: S
) => Aggregate<Output<State, S>>;

type Specification<State extends AggregateState> = {
  [K in string]: AggregateExpression<State>;
};

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = WithType<
  State,
  Merge<
    State['T'],
    { -readonly [K in keyof S]: EvaluateAggregateExpression<State, S[K]> }
  >
>;
