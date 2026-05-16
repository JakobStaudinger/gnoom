import { FunctionSignature } from '../../../types/evaluate';

export interface $toDouble {
  $toDouble: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: number;
}
