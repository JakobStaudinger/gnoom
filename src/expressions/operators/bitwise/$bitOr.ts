import { FunctionSignature } from '../../../types/evaluate';

export interface $bitOr {
  $bitOr: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [...number: number[]];
  return: number;
}
