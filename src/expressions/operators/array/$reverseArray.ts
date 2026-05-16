import { FunctionSignature } from '../../../types/evaluate';

export interface $reverseArray {
  $reverseArray: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [array: unknown[]];
  return: this['arguments'][0][number][];
}
