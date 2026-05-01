import { AggregateState } from '../types/aggregate-state';
import { AnyObject } from '../types/object';
import { Primitive } from '../types/primitive';
import { ArrayOfLength, Tail } from '../types/recursion';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from './expressions';

export type ConstantExpression<
  State extends AggregateState,
  MaxDepth extends unknown[] = ArrayOfLength<2>
> =
  | Primitive
  | null
  | undefined
  | (MaxDepth['length'] extends 0
      ? AnyObject | unknown[]
      :
          | Record<string, AggregateExpression<State, Tail<MaxDepth>>>
          | AggregateExpression<State, Tail<MaxDepth>>[]);

export type EvaluateConstant<
  State extends AggregateState,
  S,
  IncludeStatic
> = S extends AnyObject
  ? keyof S & `$${string}` extends never
    ? {
        -readonly [K in keyof S]: EvaluateAggregateExpression<
          State,
          S[K],
          IncludeStatic
        >;
      }
    : never
  : S;
