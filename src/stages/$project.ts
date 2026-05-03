import { Aggregate } from '../aggregate';
import {
  EvaluateAggregateExpression,
  AggregateExpression
} from '../expressions';
import { AggregateState, WithType } from '../types/aggregate-state';

export interface $project<State extends AggregateState> {
  $project: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Output<State, S>>;
}

type Specification<State extends AggregateState> = {
  [K in keyof State['T']]?:
    | 1
    | true
    | 0
    | false
    | Exclude<AggregateExpression<State>, number | boolean>;
};

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = WithType<
  State,
  IsPureExclusion<S> extends true
    ? Omit<State['T'], keyof S>
    : {
        -readonly [K in keyof S as S[K] extends 0 | false
          ? never
          : K]: S[K] extends 1 | true
          ? State['T'][K & keyof State['T']]
          : EvaluateAggregateExpression<State, S[K]>;
      } & ('_id' extends keyof S
        ? unknown
        : { [K in keyof State['T'] & '_id']: State['T'][K] })
>;

type IsPureExclusion<S> = S[keyof S] extends 0 | false ? true : false;
