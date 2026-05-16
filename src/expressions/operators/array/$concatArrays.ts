import { FunctionSignature } from '../../../types/evaluate';

export interface $concatArrays {
  $concatArrays: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [array1: unknown[], array2: unknown[], ...arrays: unknown[][]];
  return: this['arguments'][number][number][];
}
