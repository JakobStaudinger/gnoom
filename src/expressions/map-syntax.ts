import { AggregateState } from '../types/aggregate-state';
import { EmptyObject } from '../types/object';
import { ArrayOfLength, Tail } from '../types/recursion';
import { ConstantExpression } from './constant.expression';
import { AggregateExpression, EvaluateAggregateExpression } from './index';
import { StaticInput } from './static-input';

export type TypeScriptToMongoSyntax<
  State extends AggregateState,
  Operators,
  MaxDepth extends unknown[] = ArrayOfLength<3>
> = {
  [K in keyof Operators]: Operators[K] extends infer Op
    ? Op extends unknown
      ? Op extends (...params: infer Params) => infer _R
        ? TypeScriptParametersToMongoSyntax<State, Params, MaxDepth>
        : never
      : never
    : never;
};

export type TypeScriptParametersToMongoSyntax<
  State extends AggregateState,
  Params,
  MaxDepth extends unknown[] = ArrayOfLength<3>
> = MaxDepth extends []
  ? never
  : Params extends readonly []
    ? EmptyObject
    : Params extends readonly [infer P]
      ? TypeScriptParameterToMongoSyntax<State, P, MaxDepth>
      : {
          readonly [K in keyof Params]: K extends number | `${number}`
            ? TypeScriptParameterToMongoSyntax<State, Params[K], MaxDepth>
            : Params[K];
        };

type TypeScriptParameterToMongoSyntax<
  State extends AggregateState,
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
              ? ConstantExpression<State, Tail<MaxDepth>>
              : AggregateExpression<State, Tail<MaxDepth>>;
          }
        : ConstantExpression<State, Tail<MaxDepth>>
      : AggregateExpression<State, Tail<MaxDepth>>
    : never
  : never;

export type MongoParametersToTypeScriptSyntax<
  State extends AggregateState,
  Params
> = Params extends readonly unknown[]
  ? {
      -readonly [K in keyof Params]: K extends number | `${number}`
        ? EvaluateAggregateExpression<State, Params[K], true>
        : Params[K];
    }
  : Params extends EmptyObject
    ? []
    : [EvaluateAggregateExpression<State, Params, true>];
