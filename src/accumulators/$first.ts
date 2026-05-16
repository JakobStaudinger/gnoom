import { FunctionSignature } from '../types/evaluate';

export interface $first {
  $first: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: this['arguments'][0];
}
