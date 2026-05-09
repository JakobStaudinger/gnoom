import { ObjectId, Timestamp, UUID } from 'mongodb';
import { AggregateState } from '../types/aggregate-state';
import { GnoomError } from '../types/error';

export type EvaluateVariableExpression<
  State extends AggregateState,
  Path extends string
> = EvaluateVariableExpressionHelper<State['systemVariables'], Path, ''>;

type EvaluateVariableExpressionHelper<
  T extends object,
  Path extends string,
  Prefix extends string
> = Path extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? T[Head] extends object
      ? EvaluateVariableExpressionHelper<T[Head], Tail, `${Head}.`>
      : GnoomError<{
          message: `Cannot access property "${Tail}" of "$${Prefix}${Head}"`;
        }>
    : GnoomError<{ message: 'Key not found'; key: `$${Prefix}${Head}` }>
  : Path extends keyof T
    ? T[Path]
    : GnoomError<{
        message: 'Key not found';
        key: `$${Prefix}${Path}`;
      }>;

export type VariableExpression<State extends AggregateState> =
  `$$${VariableExpressionHelper<State['systemVariables']>}`;

type VariableExpressionHelper<T extends object> = {
  [K in keyof T & string]: T[K] extends Date | ObjectId | Timestamp | UUID
    ? K
    : T[K] extends (infer E extends object)[] | (infer E extends object)
      ? K | `${K}.${VariableExpressionHelper<E>}`
      : K;
}[keyof T & string];
