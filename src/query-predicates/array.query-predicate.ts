import { QueryPredicate } from './index';

export type ArrayQueryPredicate<T> = T extends (infer E)[]
  ? {
      $elemMatch?: QueryPredicate<E>;
      $all?: E[] | E[][];
      $size?: number;
    }
  : never;
