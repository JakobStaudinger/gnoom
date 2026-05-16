import { FunctionSignature } from '../../../types/evaluate';

export interface $size {
  $size: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [array: unknown[]];
  return: number;
}
