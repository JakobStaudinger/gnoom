import { Aggregate } from '../aggregate';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions';
import { AddStage, AggregateState } from '../types/aggregate-state';
import { GnoomError } from '../types/error';
import { AnyObject } from '../types/object';
import { Primitive } from '../types/primitive';
import { Simplify } from '../types/simplify';

export interface $replaceRoot<State extends AggregateState> {
  $replaceRoot: <const S extends Specification<State>>(specification: {
    newRoot: S;
  }) => Aggregate<Simplify<Output<State, S>>>;
  $replaceWith: <const S extends Specification<State>>(
    specification: S
  ) => Aggregate<Simplify<Output<State, S>>>;
}

type Specification<State extends AggregateState> = AggregateExpression<State>;

type Output<
  State extends AggregateState,
  S extends Specification<State>
> = AddStage<
  State,
  {
    T: EvaluateAggregateExpression<State, S> extends infer Eval
      ? IsObject<Eval> extends true
        ? Eval
        : GnoomError<{
            message: '$replaceRoot requires an expression that evaluates to an object';
            actual: Eval;
          }>
      : never;
  }
>;

type IsObject<T> = T extends Primitive
  ? false
  : T extends AnyObject
    ? true
    : false;
