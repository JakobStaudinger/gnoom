import { FunctionSignature } from '../../../types/evaluate';

export interface $toHashedIndexKey {
  $toHashedIndexKey: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [val: unknown];
  return: number;
}
