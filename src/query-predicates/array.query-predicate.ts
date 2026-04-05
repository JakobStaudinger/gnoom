import { QueryPredicate } from './index';

export type ArrayQueryPredicate<T> = T extends (infer T)[]
  ? {
      $elemMatch?: QueryPredicate<T>;
      $all?: T[] | T[][];
      $size?: number;
    }
  : never;
