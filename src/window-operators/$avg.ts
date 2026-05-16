import { FunctionSignature } from '../types/evaluate';

export interface $avg {
  $avg: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: number];
  return: this['arguments'][0];
}
