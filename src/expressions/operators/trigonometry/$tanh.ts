import { FunctionSignature } from '../../../types/evaluate';

export interface $tanh {
  $tanh: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
