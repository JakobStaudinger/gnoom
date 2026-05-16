import { FunctionSignature } from '../../../types/evaluate';

export interface $cosh {
  $cosh: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
