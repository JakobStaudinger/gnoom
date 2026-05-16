import { FunctionSignature } from '../../../types/evaluate';

export interface $atan {
  $atan: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
