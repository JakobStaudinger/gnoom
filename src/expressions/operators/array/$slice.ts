import { FunctionSignature } from '../../../types/evaluate';

export interface $slice {
  $slice: Signature;
}

interface Signature extends FunctionSignature {
  arguments:
    | [array: unknown[], n: number]
    | [array: unknown[], position: number, n: number];
  return: this['arguments'][0][number][];
}
