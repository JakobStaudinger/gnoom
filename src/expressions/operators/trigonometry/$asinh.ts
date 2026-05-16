import { FunctionSignature } from '../../../types/evaluate';

export interface $asinh {
  $asinh: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
