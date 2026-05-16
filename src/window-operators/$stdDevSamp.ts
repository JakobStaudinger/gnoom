import { FunctionSignature } from '../types/evaluate';

export interface $stdDevSamp {
  $stdDevSamp: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: number];
  return: this['arguments'][0];
}
