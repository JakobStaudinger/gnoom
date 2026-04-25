import { ArrayQueryPredicate } from './array';
import { BitwiseQueryPredicate } from './bitwise';
import { ComparisonQueryPredicate } from './comparison';
import { DataTypeQueryPredicate } from './data-type';
import { GeospatialQueryPredicate } from './geospatial';
import { LogicalQueryPredicate } from './logical.query-predicate';
import { MiscellaneousQueryPredicate } from './miscellaneous.query-predicate';

export type QueryPredicate<T> = ValueQueryPredicate<T> | QueryPredicateMap<T>;

interface QueryPredicateMap<T>
  extends
    ArrayQueryPredicate<T>,
    BitwiseQueryPredicate,
    ComparisonQueryPredicate<T>,
    DataTypeQueryPredicate,
    GeospatialQueryPredicate,
    LogicalQueryPredicate<T>,
    MiscellaneousQueryPredicate<T> {}

type ValueQueryPredicate<T> =
  | T
  | (T extends (infer E)[] ? QueryPredicate<E> : never);
