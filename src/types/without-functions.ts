import { Primitive } from './primitive';

export type WithoutFunctions<T> = T extends Primitive
  ? T
  : T extends unknown[]
    ? T
    : T extends object
      ? {
          [K in keyof T as T[K] extends (...args: never) => unknown
            ? never
            : K]: WithoutFunctions<T[K]>;
        }
      : T;
