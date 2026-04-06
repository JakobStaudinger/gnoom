import { ArithmetricExpression } from './arithmetic.expression';
import { FieldPathExpression } from './field-path.expression';
import { LiteralExpression } from './literal.expression';

export type AggregateExpression<T extends object, EvaluateTo> =
  | AggregateExpressionHelper<T, EvaluateTo, ArithmetricExpression>
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

type IndexOf<T extends unknown[]> = Exclude<keyof T, keyof unknown[]>;

type MapToExpressionInput<
  T extends object,
  Args extends [...unknown[]]
> = Args extends [StaticInput<infer R>]
  ? R extends object
    ? {
        [K in keyof R]: AggregateExpression<T, R[K]>;
      }
    : R
  : Args extends [infer R]
    ? AggregateExpression<T, R>
    : {
        [Index in IndexOf<Args>]: AggregateExpression<T, Args[Index]>;
      } & { length: Args['length'] };

const STATIC_INPUT_MARKER = Symbol('StaticInput');

export type StaticInput<T> = T & {
  [STATIC_INPUT_MARKER]: never;
};
