import { FunctionSignature } from '../../../types/evaluate';

export interface $cos {
  $cos: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
