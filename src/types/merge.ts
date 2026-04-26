import { AnyObject } from './object';

export type Merge<T1, T2> = {
  [K in keyof T1 | keyof T2]: K extends keyof T1
    ? K extends keyof T2
      ? T1[K] extends AnyObject
        ? T2[K] extends AnyObject
          ? Merge<T1[K], T2[K]>
          : T2[K]
        : T2[K]
      : T1[K]
    : K extends keyof T2
      ? T2[K]
      : never;
};
