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
> = T extends (infer E extends object)[]
  ? EvaluatePathLikeExpression<Prefix, E, Path>[]
  : Path extends `${infer Head}.${infer Tail}`
    ? Head extends keyof T
      ? T[Head] extends (infer O extends object) | null | undefined
        ?
            | EvaluatePathLikeExpressionHelper<`${Prefix}${Head}.`, O, Tail>
            | Extract<T[Head], null | undefined>
        : GnoomError<{
            message: `Cannot access property "${Tail}" of "${Prefix}${Head}"`;
          }>
      : GnoomError<{ message: 'Key not found'; key: `${Prefix}${Head}` }>
    : Path extends keyof T
      ? T[Path]
      : GnoomError<{ message: 'Key not found'; key: `${Prefix}${Path}` }>;
