import { FunctionSignature } from '../../../types/evaluate';

export interface $bitXor {
  $bitXor: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [...numbers: number[]];
  return: number;
}
