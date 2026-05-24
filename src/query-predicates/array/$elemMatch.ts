import { QueryOperator } from '..';

export interface $elemMatch<T> {
  $elemMatch: T extends (infer E)[] ? QueryOperator<E> : never;
}
