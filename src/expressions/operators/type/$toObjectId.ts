import { ObjectId } from 'mongodb';
import { FunctionSignature } from '../../../types/evaluate';

export interface $toObjectId {
  $toObjectId: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: ObjectId;
}
