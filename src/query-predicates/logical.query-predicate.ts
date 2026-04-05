import { QueryPredicate } from './index';

export type LogicalQueryPredicate<T> = {
  $not?: Exclude<QueryPredicate<T>, T>;
};
