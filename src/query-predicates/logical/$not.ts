import { QueryOperator } from '../index';

export interface $not<T> {
  $not: Exclude<QueryOperator<T>, T>;
}
