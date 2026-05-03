import { ObjectId, Timestamp, UUID } from 'mongodb';
import { AggregateState } from '../types/aggregate-state';

export type EvaluateFieldPathExpression<
  State extends AggregateState,
  Path
> = EvaluateFieldPathExpressionHelper<State['T'], Path>;

type EvaluateFieldPathExpressionHelper<
  T extends object,
  Path
> = Path extends `${infer Head extends keyof T & string}.${infer Tail}`
  ? T[Head] extends object
    ? EvaluateFieldPathExpressionHelper<T[Head], Tail>
    : T[Head]
  : Path extends keyof T & string
    ? T[Path]
    : undefined;

export type FieldPathExpression<State extends AggregateState> =
  `$${FieldPathExpressionHelper<State['T']>}`;

type FieldPathExpressionHelper<T extends object> = {
  [K in keyof T & string]: T[K] extends Date | ObjectId | Timestamp | UUID
    ? K
    : T[K] extends (infer E extends object)[] | (infer E extends object)
      ? K | `${K}.${FieldPathExpressionHelper<E>}`
      : K;
}[keyof T & string];
