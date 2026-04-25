import { BSONTypeAlias } from 'mongodb';

export interface $type {
  $type?: BSONTypeAlias | 'number';
}
