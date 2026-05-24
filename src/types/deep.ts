import { AnyObject } from './object';
import { Primitive } from './primitive';

export type DeepKeyof<T> = T extends (infer E)[] | null | undefined
  ? DeepKeyof<E>
  : T extends Primitive | null | undefined
    ? never
    : {
        [K in keyof NonNullable<T> & string]: NonNullable<T>[K] extends
          | Primitive
          | null
          | undefined
          ? K
          : NonNullable<T>[K] extends object | unknown[] | null | undefined
            ? K | `${K}.${DeepKeyof<NonNullable<T>[K]>}`
            : K;
      }[keyof NonNullable<T> & string];

export type DeepType<T, K> = T extends (infer E)[] | null | undefined
  ? DeepType<E, K> extends never
    ? never
    : DeepType<E, K>[] | Extract<T, null | undefined>
  : K extends keyof NonNullable<T>
    ? NonNullable<T>[K] | Extract<T, null | undefined>
    : K extends `${infer Head extends keyof NonNullable<T> & string}.${infer Tail}`
      ? Tail extends DeepKeyof<NonNullable<T>[Head]>
        ? DeepType<NonNullable<T>[Head] | Extract<T, null | undefined>, Tail>
        : never
      : never;

export type DeepPartial<T> = T extends Primitive | unknown[]
  ? T
  : { [K in keyof T]?: DeepPartial<T[K]> };

export type FromDeepEntry<
  Key extends string,
  Value
> = Key extends `${infer Head}.${infer Tail}`
  ? { [K in Head]: FromDeepEntry<Tail, Value> }
  : { [K in Key]: Value };

export type DeepEntries<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends AnyObject
    ? DeepEntries<T[K], `${Prefix}${K}.`>
    : T[K] extends (infer E)[]
      ? DeepEntries<E, `${Prefix}${K}.`>
      : [`${Prefix}${K}`, T[K]];
}[keyof T & string];
