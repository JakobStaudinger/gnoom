import { ObjectId } from 'mongodb';

export interface $toObjectId {
  $toObjectId: <T>(value: T) => ObjectId;
}
