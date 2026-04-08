import { ArithmetricOperator } from './arithmetic.operator';
import { ArrayOperator } from './array.operator';
import { BitwiseOperator } from './bitwise.operator';
import { BooleanOperator } from './boolean.operator';
import { ComparisonOperator } from './comparison.operator';
import { ConditionalOperator } from './conditional.operator';
import { DataSizeOperator } from './data-size.operator';
import { DateOperator } from './date.operator';
import { FieldPathExpression } from './field-path.expression';
import { GroupOperator } from './group.operator';
import { LiteralExpression } from './literal.expression';

export type AggregateExpression<T extends object, EvaluateTo> =
  | AggregateExpressionHelper<T, EvaluateTo, ArithmetricOperator>
  | AggregateExpressionHelper<T, EvaluateTo, ArrayOperator>
  | AggregateExpressionHelper<T, EvaluateTo, BitwiseOperator>
  | AggregateExpressionHelper<T, EvaluateTo, BooleanOperator>
  | AggregateExpressionHelper<T, EvaluateTo, ComparisonOperator>
  | AggregateExpressionHelper<T, EvaluateTo, ConditionalOperator>
  | AggregateExpressionHelper<T, EvaluateTo, DataSizeOperator>
  | AggregateExpressionHelper<T, EvaluateTo, DateOperator>
  | AggregateExpressionHelper<T, EvaluateTo, GroupOperator>
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
> = Args extends [StaticInput<infer R> | infer NonStaticInput]
  ?
      | AggregateExpression<T, NonStaticInput>
      | (R extends object
          ? {
              [K in keyof R]: NonNullable<R[K]> extends StaticInput<infer I>
                ? LiteralExpression<I>
                : AggregateExpression<T, R[K]>;
            }
          : LiteralExpression<R>)
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

type A = [unknown] extends [StaticInput<infer R>] ? true : false;
