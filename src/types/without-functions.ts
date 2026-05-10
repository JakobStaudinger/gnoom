export type WithoutFunctions<T> = {
  [K in keyof T as T[K] extends (...args: never) => unknown ? never : K]: T[K];
};
