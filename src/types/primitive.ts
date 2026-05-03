import { ObjectId, Timestamp, UUID } from 'mongodb';
import { NonCollapsingNumber, NonCollapsingString } from './non-collapsing';

export type Primitive =
  | NonCollapsingString
  | boolean
  | NonCollapsingNumber
  | Date
  | Timestamp
  | ObjectId
  | UUID;
