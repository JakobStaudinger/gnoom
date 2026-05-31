import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { Merge } from '../types/merge';
import { Simplify } from '../types/simplify';

export interface $addFields<State extends AggregateState> {
  $addFields: Signature<State>;
  $set: Signature<State>;
}

type Signature<State extends AggregateState> = <
  const S extends Specification<State>
>(
  specification: S
) => Aggregate<Simplify<Output<State, S>>>;

type Specification<State extends AggregateState> = {
  [K in string]: AggregateExpression<State>;
};

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<State, { T: Merge<State['T'], NewType<State, S>> }>;

type NewType<State extends AggregateState, S extends Specification<State>> = {
  -readonly [K in keyof S]: EvaluateAggregateExpression<State, S[K]>;
};
