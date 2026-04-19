import { EmptyObject } from '../types/object';
import { ConstantExpression } from './constant.expression';
import { AggregateExpression, EvaluateAggregateExpression } from './index';
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
  : Params extends readonly [StaticInput<infer R> | infer _NonStaticInput]
    ?
        | AggregateExpression<T>
        | (R extends object
            ? {
                readonly [K in keyof R]: NonNullable<R[K]> extends StaticInput<
                  infer _I
                >
                  ? ConstantExpression
                  : AggregateExpression<T>;
              }
            : ConstantExpression)
    : {
        readonly [K in keyof Params]: K extends number | `${number}`
          ? AggregateExpression<T>
          : Params[K];
      };

export type MongoParametersToTypeScriptSyntax<
  T extends object,
  Params
> = Params extends readonly unknown[]
  ? {
      [K in keyof Params]: K extends number | `${number}`
        ? EvaluateAggregateExpression<T, Params[K], true>
        : Params[K];
    }
  : Params extends EmptyObject
    ? []
    : [EvaluateAggregateExpression<T, Params, true>];
