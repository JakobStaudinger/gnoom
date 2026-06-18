import { FunctionSignature } from '../../../types/evaluate';

export interface $first {
  $first: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: unknown[]];
  return: this['arguments'][0][0];
}
