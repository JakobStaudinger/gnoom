import { FunctionSignature } from '../../../types/evaluate';

export interface $atan2 {
  $atan2: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [y: number, x: number];
  return: number;
}
