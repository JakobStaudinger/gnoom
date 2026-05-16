import { FunctionSignature } from '../types/evaluate';

export interface $min {
  $min: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: this['arguments'][0];
}
