import { FunctionSignature } from '../../../types/evaluate';

export interface $multiply {
  $multiply: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number, y: number, ...others: number[]];
  return: number;
}
