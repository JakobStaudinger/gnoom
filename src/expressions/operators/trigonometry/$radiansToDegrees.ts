import { FunctionSignature } from '../../../types/evaluate';

export interface $radiansToDegrees {
  $radiansToDegrees: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
