import { FunctionSignature } from '../../../types/evaluate';

export interface $literal {
  $literal: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: this['arguments'][0];
}
