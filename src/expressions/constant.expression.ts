import { AnyObject } from '../types/object';
import { Primitive } from '../types/primitive';
import { EvaluateAggregateExpression } from './expressions';

export type ConstantExpression =
  | AnyObject
  | Primitive
  | null
  | undefined
  | unknown[];

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
