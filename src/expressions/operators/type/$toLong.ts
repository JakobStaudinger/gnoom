import { FunctionSignature } from '../../../types/evaluate';

export interface $toLong {
  $toLong: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: number;
}
