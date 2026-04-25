import { QueryPredicate } from './index';

export type ArrayQueryPredicate<T> = {
  $elemMatch?: T extends (infer E)[] ? QueryPredicate<E> : never;
  $all?: T extends (infer E)[] ? E[] | E[][] : never;
  $size?: number;
};
