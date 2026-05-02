import { AggregateState } from '../types/aggregate-state';
import { NonCollapsingUnknown } from '../types/non-collapsing-unknown';
import { AnyObject } from '../types/object';
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
