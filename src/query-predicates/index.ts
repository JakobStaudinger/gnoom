import { ArrayQueryPredicate } from './array.query-predicate';
import { BitwiseQueryPredicate } from './bitwise.query-predicate';
import { ComparisonQueryPredicate } from './comparison.query-predicate';
import { DataTypeQueryPredicate } from './data-type.query-predicate';
import { GeospatialQueryPredicate } from './geospatial.query-predicate';
import { LogicalQueryPredicate } from './logical.query-predicate';
import { MiscellaneousQueryPredicate } from './miscellaneous.query-predicate';

export type QueryPredicate<T> =
  | T
  | ArrayQueryPredicate<T>
  | BitwiseQueryPredicate<T>
  | ComparisonQueryPredicate<T>
  | DataTypeQueryPredicate<T>
  | GeospatialQueryPredicate<T>
  | LogicalQueryPredicate<T>
  | MiscellaneousQueryPredicate<T>;
