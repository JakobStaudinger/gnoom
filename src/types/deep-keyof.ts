import { ObjectId, Timestamp } from 'mongodb';
import { AnyObject } from './object';

export type DeepKeyof<T> = T extends (infer E)[]
  ? DeepKeyof<E>
  : {
      [K in keyof T & string]: T[K] extends ObjectId | Date | Timestamp
        ? K
        : T[K] extends AnyObject | unknown[]
          ? K | `${K}.${DeepKeyof<T[K]>}`
          : K;
    }[keyof T & string];

export type DeepType<T, K> = T extends (infer E)[]
  ? DeepType<E, K>
  : K extends keyof T
    ? T[K]
    : K extends `${infer Head extends keyof T & string}.${infer Tail}`
      ? Tail extends DeepKeyof<T[Head]>
        ? DeepType<T[Head], Tail>
        : never
      : never;
