import { AnyObject, EmptyObject } from '../types/object';
import { UnconstrainedConstantExpression } from './constant.expression';
import {
  EvaluateAggregateExpression,
  UnconstrainedAggregateExpression
} from './index';
import { StaticInput } from './static-input';

export type TypeScriptToMongoSyntax<T extends object, Operators> = {
  [K in keyof Operators]: Operators[K] extends (
    ...params: infer Params
  ) => infer _R
    ? TypeScriptParametersToMongoSyntax<T, Params>
    : never;
};

export type TypeScriptParametersToMongoSyntax<
  T extends object,
  Params
> = Params extends readonly []
  ? EmptyObject
  : Params extends readonly [StaticInput<infer R> | infer NonStaticInput]
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
        readonly [K in keyof Params]: K extends number | `${number}`
          ? UnconstrainedAggregateExpression<T>
          : Params[K];
      };

export type MongoParametersToTypeScriptSyntax<
  T extends object,
  Params
> = Params extends readonly unknown[]
  ? {
      [K in keyof Params]: K extends number | `${number}`
        ? EvaluateAggregateExpression<T, Params[K]>
        : Params[K];
    }
  : Params extends EmptyObject
    ? []
    : Params extends AnyObject
      ?
          | [EvaluateAggregateExpression<T, Params>]
          | [
              StaticInput<{
                -readonly [K in keyof Params]: EvaluateAggregateExpression<
                  T,
                  Params[K]
                >;
              }>
            ]
      : [EvaluateAggregateExpression<T, Params>];
