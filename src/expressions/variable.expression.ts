import { ObjectId, Timestamp, UUID } from 'mongodb';
import { AggregateState } from '../types/aggregate-state';

export type EvaluateVariableExpression<
  State extends AggregateState,
  Path
> = EvaluateVariableExpressionHelper<State['systemVariables'], Path>;

type EvaluateVariableExpressionHelper<
  T extends object,
  Path
> = Path extends `${infer Head extends keyof T & string}.${infer Tail}`
  ? T[Head] extends object
    ? EvaluateVariableExpressionHelper<T[Head], Tail>
    : T[Head]
  : Path extends keyof T & string
    ? T[Path]
    : undefined;

export type VariableExpression<State extends AggregateState> =
  `$$${VariableExpressionHelper<State['systemVariables']>}`;

type VariableExpressionHelper<T extends object> = {
  [K in keyof T & string]: T[K] extends Date | ObjectId | Timestamp | UUID
    ? K
    : T[K] extends (infer E extends object)[] | (infer E extends object)
      ? K | `${K}.${VariableExpressionHelper<E>}`
      : K;
}[keyof T & string];
