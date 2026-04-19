import { AnyObject } from '../types/object';
import { Primitive } from '../types/primitive';
import { ArrayOfLength, Tail } from '../types/recursion';
import {
  AggregateExpression,
  EvaluateAggregateExpression
} from './expressions';

export type ConstantExpression<
  T extends object,
  MaxDepth extends unknown[] = ArrayOfLength<2>
> =
  | Primitive
  | null
  | undefined
  | (MaxDepth['length'] extends 0
      ? AnyObject | unknown[]
      :
          | Record<string, AggregateExpression<T, Tail<MaxDepth>>>
          | AggregateExpression<T, Tail<MaxDepth>>[]);

export type EvaluateConstant<
  T extends object,
  S,
  IncludeStatic
> = S extends AnyObject
  ? keyof S & `$${string}` extends never
    ? {
        -readonly [K in keyof S]: EvaluateAggregateExpression<
          T,
          S[K],
          IncludeStatic
        >;
      }
    : never
  : S;
