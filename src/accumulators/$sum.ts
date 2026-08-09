import { FunctionSignature } from '../types/evaluate';

export interface $sum {
  $sum: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: number];
  return: number;
}
