import { FunctionSignature } from '../types/evaluate';

export interface $locf {
  $locf: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: this['arguments'][0];
}
