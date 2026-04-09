import { FieldPathExpression } from './field-path.expression';
import { LiteralExpression } from './literal.expression';
import { ArithmetricOperator } from './operators/arithmetic.operator';
import { ArrayOperator } from './operators/array.operator';
import { BitwiseOperator } from './operators/bitwise.operator';
import { BooleanOperator } from './operators/boolean.operator';
import { ComparisonOperator } from './operators/comparison.operator';
import { ConditionalOperator } from './operators/conditional.operator';
import { DataSizeOperator } from './operators/data-size.operator';
import { DateOperator } from './operators/date.operator';
import { GroupOperator } from './operators/group.operator';
import { LiteralExpressionOperator } from './operators/literal-expression.operator';
import { MiscellaneousOperator } from './operators/miscellaneous.operator';
import { ObjectOperator } from './operators/object.operator';
import { SetOperator } from './operators/set.operator';
import { StaticInput } from './static-input';

type Operators =
  | ArithmetricOperator
  | ArrayOperator
  | BitwiseOperator
  | BooleanOperator
  | ComparisonOperator
  | ConditionalOperator
  | DataSizeOperator
  | DateOperator
  | GroupOperator
  | LiteralExpressionOperator
  | MiscellaneousOperator
  | ObjectOperator
  | SetOperator;

export type AggregateExpression<T extends object, EvaluateTo> =
  | AggregateExpressionHelper<T, EvaluateTo, Operators>
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
