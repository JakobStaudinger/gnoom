import { FunctionSignature } from '../../../types/evaluate';

export interface $rand {
  $rand: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [];
  return: number;
}
