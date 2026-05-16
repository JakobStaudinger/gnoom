import { FunctionSignature } from '../../../types/evaluate';

export interface $bitAnd {
  $bitAnd: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [...numbers: number[]];
  return: number;
}
