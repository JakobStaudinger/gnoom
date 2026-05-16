import { FunctionSignature } from '../types/evaluate';

export interface $stdDevPop {
  $stdDevPop: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: number];
  return: this['arguments'][0];
}
