import { FunctionSignature } from '../types/evaluate';

export interface $denseRank {
  $denseRank: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [];
  return: number;
}
