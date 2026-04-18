import { EmptyObject } from '../types/object';
import { AggregateExpression, UnconstrainedAggregateExpression } from './index';
import {
  ConstantExpression,
  UnconstrainedConstantExpression
} from './constant.expression';
import { StaticInput } from './static-input';

export type UnconstrainedMapToOperatorSyntax<T extends object, Operators> = {
  [K in keyof Operators]: Operators[K] extends (...args: infer Args) => infer _R
    ? UnconstrainedMapOperatorParameters<T, Args>
    : never;
};

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
                  ? ConstantExpression<I>
                  : AggregateExpression<T, R[K]>;
              }
            : ConstantExpression<R>)
    : {
        readonly [K in keyof Args]: K extends number | `${number}`
          ? AggregateExpression<T, Args[K]>
          : Args[K];
      };

export type UnconstrainedMapOperatorParameters<
  T extends object,
  Args
> = Args extends readonly []
  ? EmptyObject
  : Args extends readonly [StaticInput<infer R> | infer NonStaticInput]
    ?
        | UnconstrainedAggregateExpression<T>
        | (R extends object
            ? {
                readonly [K in keyof R]: NonNullable<R[K]> extends StaticInput<
                  infer I
                >
                  ? UnconstrainedConstantExpression
                  : UnconstrainedAggregateExpression<T>;
              }
            : UnconstrainedConstantExpression)
    : {
        readonly [K in keyof Args]: K extends number | `${number}`
          ? AggregateExpression<T, Args[K]>
          : Args[K];
      };
