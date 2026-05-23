import { GnoomError } from '../types/error';
import { Primitive } from '../types/primitive';

export type PathLikeExpression<
  Prefix extends string,
  T extends object
> = `${Prefix}${PathLikeExpressionHelper<T>}`;

type PathLikeExpressionHelper<T extends object> = {
  [K in keyof T & string]: T[K] extends Primitive
    ? K
    : T[K] extends (infer E extends object)[] | (infer E extends object)
      ? K | `${K}.${PathLikeExpressionHelper<E>}`
      : K;
}[keyof T & string];

export type EvaluatePathLikeExpression<
  Prefix extends string,
  T extends object,
  Path extends string
> = EvaluatePathLikeExpressionHelper<Prefix, T, Path>;

type EvaluatePathLikeExpressionHelper<
  Prefix extends string,
  T extends object,
  Path extends string
> = Path extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? T[Head] extends object
      ? EvaluatePathLikeExpressionHelper<`${Prefix}${Head}.`, T[Head], Tail>
      : GnoomError<{
          message: `Cannot access property "${Tail}" of "${Prefix}${Head}"`;
        }>
    : GnoomError<{ message: 'Key not found'; key: `${Prefix}${Head}` }>
  : Path extends keyof T
    ? T[Path]
    : GnoomError<{
        message: 'Key not found';
        key: `${Prefix}${Path}`;
      }>;
