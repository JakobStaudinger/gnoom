import { ArrayQueryPredicate } from './array';
import { BitwiseQueryPredicate } from './bitwise';
import { ComparisonQueryPredicate } from './comparison.query-predicate';
import { DataTypeQueryPredicate } from './data-type.query-predicate';
import { GeospatialQueryPredicate } from './geospatial.query-predicate';
import { LogicalQueryPredicate } from './logical.query-predicate';
import { MiscellaneousQueryPredicate } from './miscellaneous.query-predicate';

export type QueryPredicate<T> = ValueQueryPredicate<T> | QueryPredicateMap<T>;

interface QueryPredicateMap<T>
  extends
    ArrayQueryPredicate<T>,
    BitwiseQueryPredicate,
    ComparisonQueryPredicate<T>,
    DataTypeQueryPredicate<T>,
    GeospatialQueryPredicate<T>,
    LogicalQueryPredicate<T>,
    MiscellaneousQueryPredicate<T> {}

type ValueQueryPredicate<T> =
  | T
  | (T extends (infer E)[] ? QueryPredicate<E> : never);
