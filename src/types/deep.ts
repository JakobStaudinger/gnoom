import { ObjectId, Timestamp, UUID } from 'mongodb';
import { AnyObject } from './object';

export type DeepKeyof<T> = T extends (infer E)[]
  ? DeepKeyof<E>
  : {
      [K in keyof T & string]: T[K] extends ObjectId | Date | Timestamp | UUID
        ? K
        : T[K] extends object | unknown[]
          ? K | `${K}.${DeepKeyof<T[K]>}`
          : K;
    }[keyof T & string];

export type DeepType<T, K> = T extends (infer E)[]
  ? DeepType<E, K>[]
  : K extends keyof T
    ? T[K]
    : K extends `${infer Head extends keyof T & string}.${infer Tail}`
      ? Tail extends DeepKeyof<T[Head]>
        ? DeepType<T[Head], Tail>
        : never
      : never;

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
