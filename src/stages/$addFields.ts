import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AggregateState, WithError, WithType } from '../types/aggregate-state';
import { ErrorsFromFields } from '../types/error';
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
> = WithError<
  WithType<State, Merge<State['T'], NewType<State, S>>>,
  ErrorsFromFields<NewType<State, S>>
>;

type NewType<State extends AggregateState, S extends Specification<State>> = {
  -readonly [K in keyof S]: EvaluateAggregateExpression<State, S[K]>;
};
