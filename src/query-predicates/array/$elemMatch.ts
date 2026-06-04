import { NestedQueryPredicate } from '..';

export interface $elemMatch<T> {
  $elemMatch: T extends (infer E)[] ? NestedQueryPredicate<E> : never;
}
