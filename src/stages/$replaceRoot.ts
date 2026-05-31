import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { Simplify } from '../types/simplify';

export interface $replaceRoot<State extends AggregateState> {
  $replaceRoot: <const S extends Specification<State>>(specification: {
    newRoot: S;
  }) => Aggregate<Simplify<Output<State, S>>>;
  $replaceWith: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Simplify<Output<State, S>>>;
}

type Specification<State extends AggregateState> = {
  [K in string]: AggregateExpression<State>;
};

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: {
      -readonly [K in keyof S]: EvaluateAggregateExpression<State, S[K]>;
    };
  }
>;
