import { ArithmetricExpression } from './arithmetic.expression';
import { ArrayExpression } from './array.expression';
import { BitwiseExpression } from './bitwise.expression';
import { BooleanExpression } from './boolean.expression';
import { ComparisonExpression } from './comparison.expression';
import { ConditionalExpression } from './conditional.expression';
import { FieldPathExpression } from './field-path.expression';
import { LiteralExpression } from './literal.expression';

export type AggregateExpression<T extends object, EvaluateTo> =
  | AggregateExpressionHelper<T, EvaluateTo, ArithmetricExpression>
  | AggregateExpressionHelper<T, EvaluateTo, ArrayExpression>
  | AggregateExpressionHelper<T, EvaluateTo, BitwiseExpression>
  | AggregateExpressionHelper<T, EvaluateTo, BooleanExpression>
  | AggregateExpressionHelper<T, EvaluateTo, ComparisonExpression>
  | AggregateExpressionHelper<T, EvaluateTo, ConditionalExpression>
  | LiteralExpression<EvaluateTo>
  | FieldPathExpression<T, EvaluateTo>;

type AggregateExpressionHelper<T extends object, EvaluateTo, S> =
  S extends Record<string, (...args: infer _Args) => infer _R>
    ? {
        [K in keyof S]: ReturnType<S[K]> extends EvaluateTo
          ? MapToExpression<T, S[K]>
          : never;
      }
    : never;

type MapToExpression<T extends object, E> = E extends (
  ...args: infer Args
) => infer _R
  ? MapToExpressionInput<T, Args>
  : E;

type MapToExpressionInput<
  T extends object,
  Args extends unknown[]
> = Args extends [StaticInput<infer R>]
  ? R extends object
    ? {
        [K in keyof R]: NonNullable<R[K]> extends StaticInput<infer I>
          ? LiteralExpression<I>
          : AggregateExpression<T, R[K]>;
      }
    : R
  : Args extends [infer R]
    ? AggregateExpression<T, R>
    : IsTuple<Args> extends true
      ? {
          [Index in IndexOf<Args>]: AggregateExpression<T, Args[Index]>;
        } & { length: Args['length'] }
      : {
          [Index in number]: AggregateExpression<T, Args[Index]>;
        };

type IndexOf<T extends unknown[]> = Exclude<keyof T, keyof unknown[]>;

const STATIC_INPUT_MARKER = Symbol('StaticInput');

export type StaticInput<T> = T & {
  [STATIC_INPUT_MARKER]: never;
};

type IsTuple<T extends unknown[]> = number extends T['length'] ? false : true;
