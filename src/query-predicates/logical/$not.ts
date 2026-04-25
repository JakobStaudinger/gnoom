import { QueryPredicate } from '../index';

export interface $not<T> {
  $not?: Exclude<QueryPredicate<T>, T>;
}
