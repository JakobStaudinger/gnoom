import { QueryPredicate } from '../index';

export interface $elemMatch<T> {
  $elemMatch?: T extends (infer E)[] ? QueryPredicate<E> : never;
}
