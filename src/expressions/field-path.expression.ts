import { ObjectId, Timestamp } from 'mongodb';

export type EvaluateFieldPathExpression<
  T extends object,
  Path
> = Path extends `${infer Head extends keyof T & string}.${infer Tail}`
  ? T[Head] extends object
    ? EvaluateFieldPathExpression<T[Head], Tail>
    : T[Head]
  : Path extends keyof T & string
    ? T[Path]
    : undefined;

export type FieldPathExpression<T extends object> =
  `$${FieldPathExpressionHelper<T>}`;

type FieldPathExpressionHelper<T extends object> = {
  [K in keyof T & string]: T[K] extends Date | ObjectId | Timestamp
    ? K
    : T[K] extends (infer E extends object)[] | (infer E extends object)
      ? K | `${K}.${FieldPathExpressionHelper<E>}`
      : K;
}[keyof T & string];
