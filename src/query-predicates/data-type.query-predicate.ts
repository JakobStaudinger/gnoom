import type { BSONTypeAlias } from 'mongodb';

export type DataTypeQueryPredicate<_T> = {
  $exists: boolean;
  $type: BSONTypeAlias | 'number';
};
