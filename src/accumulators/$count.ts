import { FunctionSignature } from '../types/evaluate';

export interface $count {
  $count: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [];
  return: number;
}
