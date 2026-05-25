import {
  AggregateExpression,
  EvaluateAggregateExpression
} from '../expressions/index';
import { StaticInput } from '../expressions/static-input';
import { AggregateState } from './aggregate-state';
import { GnoomError } from './error';
import { FunctionSignature } from './evaluate';
import { EmptyObject } from './object';
import { ArrayOfLength, Tail } from './recursion';

export type TypeScriptToMongoSyntax<
  State extends AggregateState,
  Operators,
  MaxDepth extends unknown[] = ArrayOfLength<3>
> = {
  [K in keyof Operators]: Operators[K] extends infer Op
    ? Op extends FunctionSignature
      ? TypeScriptParametersToMongoSyntax<State, Op['arguments'], MaxDepth>
      : GnoomError<{
          message: `Error in declaration of "${K & string}". This is a bug in the libary, please report this issue.`;
        }>
    : never;
};

type TypeScriptParametersToMongoSyntax<
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
  ? P extends StaticInput<infer R>
    ? R extends readonly unknown[]
      ? {
          readonly [K in keyof R]: K extends number | `${number}`
            ? TypeScriptParameterToMongoSyntax<State, R[K], MaxDepth>
            : R[K];
        }
      : R extends object
        ? {
            readonly [K in keyof R]: TypeScriptParameterToMongoSyntax<
              State,
              R[K],
              MaxDepth
            >;
          }
        : R
    : AggregateExpression<State, Tail<MaxDepth>>
  : never;

export type MongoParametersToTypeScriptSyntax<
  State extends AggregateState,
  Params
> = Params extends readonly []
  ? unknown
  : Params extends readonly unknown[]
    ? {
        -readonly [K in keyof Params]: K extends number | `${number}`
          ? EvaluateAggregateExpression<State, Params[K], true>
          : Params[K];
      }
    : Params extends EmptyObject
      ? []
      : [EvaluateAggregateExpression<State, Params, true>];
