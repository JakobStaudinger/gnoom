import { EmptyObject } from '../types/object';
import { AggregateExpression } from './index';
import { LiteralExpression } from './literal.expression';
import { StaticInput } from './static-input';

export type MapToOperatorSyntax<T extends object, EvaluateTo, Operators> = {
  [K in keyof Operators]: Operators[K] extends (...args: infer Args) => infer R
    ? R extends EvaluateTo
      ? MapOperatorParameters<T, Args>
      : never
    : never;
};

export type MapOperatorParameters<
  T extends object,
  Args
> = Args extends readonly []
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
