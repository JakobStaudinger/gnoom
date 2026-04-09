import { AggregateExpression } from './index';
import { LiteralExpression } from './literal.expression';
import { StaticInput } from './static-input';

export type MapToOperatorSyntax<T extends object, EvaluateTo, Operators> =
  Operators extends Record<string, (...args: infer _Args) => infer _R>
    ? {
        [K in keyof Operators]: ReturnType<Operators[K]> extends EvaluateTo
          ? MapToExpression<T, Operators[K]>
          : never;
      }
    : never;

type MapToExpression<T extends object, E> = E extends (
  ...args: infer Args
) => infer _R
  ? MapToExpressionInput<T, Args>
  : E;

type MapToExpressionInput<T extends object, Args> = Args extends readonly []
  ? EmptyObject
  : Args extends readonly [StaticInput<infer R> | infer NonStaticInput]
    ?
        | AggregateExpression<T, NonStaticInput>
        | (R extends object
            ? {
                readonly [K in keyof R]: NonNullable<R[K]> extends StaticInput<
                  infer I
                >
                  ? LiteralExpression<I>
                  : AggregateExpression<T, R[K]>;
              }
            : LiteralExpression<R>)
    : {
        readonly [K in keyof Args]: K extends number | `${number}`
          ? AggregateExpression<T, Args[K]>
          : Args[K];
      };

type EmptyObject = Record<string, never>;
