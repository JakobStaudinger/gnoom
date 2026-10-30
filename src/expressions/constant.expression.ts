import { AggregateState } from '../types/aggregate-state';
import { NonCollapsingUnknown } from '../types/non-collapsing';
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
  | NonCollapsingUnknown
  | (MaxDepth['length'] extends 0
      ? never
      :
          | Record<string, AggregateExpression<State, Tail<MaxDepth>>>
          | AggregateExpression<State, Tail<MaxDepth>>[]);

export type EvaluateConstant<
  State extends AggregateState,
  S,
  IncludeStatic
> = S extends Primitive
  ? S
  : S extends AnyObject
    ? {
        -readonly [K in keyof S]: EvaluateAggregateExpression<
          State,
          S[K],
          IncludeStatic
        >;
      }
    : S extends readonly unknown[]
      ? {
          -readonly [K in keyof S]: K extends number | `${number}`
            ? EvaluateAggregateExpression<State, S[K], IncludeStatic>
            : S[K];
        }
      : S;
