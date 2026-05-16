import { FunctionSignature } from '../types/evaluate';

export interface $rank {
  $rank: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [];
  return: number;
}
