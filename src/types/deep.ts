import { AnyObject } from './object';
import { Primitive } from './primitive';

export type DeepKeyof<T extends object> = {
  [K in keyof NonNullable<T> & string]: DeepKeyofHelper<NonNullable<T>[K], K>;
}[keyof NonNullable<T> & string];

type DeepKeyofHelper<T, K extends string> = T extends
  | Primitive
  | null
  | undefined
  ? K
  : T extends (infer E)[] | null | undefined
    ? E extends object
      ?
          | K
          | `${K}.${number}`
          | `${K}.${DeepKeyof<E>}`
          | `${K}.${number}.${DeepKeyof<E>}`
      : K | `${K}.${number}`
    : T extends object | null | undefined
      ? K | `${K}.${DeepKeyof<NonNullable<T>>}`
      : K;

export type DeepType<T, K> = T extends (infer E)[] | null | undefined
  ? DeepType<E, K> extends never
    ? never
    : DeepType<E, K>[] | Extract<T, null | undefined>
  : K extends keyof NonNullable<T>
    ? NonNullable<T>[K] | Extract<T, null | undefined>
    : K extends `${infer Head extends keyof NonNullable<T> & string}.${infer Tail}`
      ? NonNullable<T>[Head] extends object
        ? Tail extends DeepKeyof<NonNullable<T>[Head]>
          ? DeepType<NonNullable<T>[Head] | Extract<T, null | undefined>, Tail>
          : never
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
