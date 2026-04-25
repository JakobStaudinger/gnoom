import { EmptyObject } from '../types/object';
import { ArrayOfLength, Tail } from '../types/recursion';
import { ConstantExpression } from './constant.expression';
import { AggregateExpression, EvaluateAggregateExpression } from './index';
import { StaticInput } from './static-input';

export type TypeScriptToMongoSyntax<
  T extends object,
  Operators,
  MaxDepth extends unknown[] = ArrayOfLength<3>
> = {
  [K in keyof Operators]: Operators[K] extends infer Op
    ? Op extends unknown
      ? Op extends (...params: infer Params) => infer _R
        ? TypeScriptParametersToMongoSyntax<T, Params, MaxDepth>
        : never
      : never
    : never;
};

export type TypeScriptParametersToMongoSyntax<
  T extends object,
  Params,
  MaxDepth extends unknown[] = ArrayOfLength<3>
> = MaxDepth extends []
  ? never
  : Params extends readonly []
    ? EmptyObject
    : Params extends readonly [infer P]
      ? TypeScriptParameterToMongoSyntax<T, P, MaxDepth>
      : {
          readonly [K in keyof Params]: K extends number | `${number}`
            ? TypeScriptParameterToMongoSyntax<T, Params[K], MaxDepth>
            : Params[K];
        };

type TypeScriptParameterToMongoSyntax<
  T extends object,
  Param,
  MaxDepth extends unknown[]
> = Param extends infer P
  ? P extends unknown
    ? P extends StaticInput<infer R>
      ? R extends object
        ? {
            readonly [K in keyof R]: NonNullable<R[K]> extends StaticInput<
              infer _I
            >
              ? ConstantExpression<T, Tail<MaxDepth>>
              : AggregateExpression<T, Tail<MaxDepth>>;
          }
        : ConstantExpression<T, Tail<MaxDepth>>
      : AggregateExpression<T, Tail<MaxDepth>>
    : never
  : never;

export type MongoParametersToTypeScriptSyntax<
  T extends object,
  Params
> = Params extends readonly unknown[]
  ? {
      -readonly [K in keyof Params]: K extends number | `${number}`
        ? EvaluateAggregateExpression<T, Params[K], true>
        : Params[K];
    }
  : Params extends EmptyObject
    ? []
    : [EvaluateAggregateExpression<T, Params, true>];
