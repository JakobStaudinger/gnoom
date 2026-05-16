import { FunctionSignature } from '../../../types/evaluate';

export interface $bsonSize {
  $bsonSize: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: number;
}
