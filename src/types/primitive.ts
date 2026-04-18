import { ObjectId, Timestamp } from 'mongodb';

export type Primitive =
  | (string & {})
  | boolean
  | number
  | Date
  | Timestamp
  | ObjectId;
