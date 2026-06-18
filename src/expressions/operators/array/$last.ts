import { FunctionSignature } from '../../../types/evaluate';
import { Decrement } from '../../../types/recursion';

export interface $last {
  $last: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: unknown[]];
  return: this['arguments'][0][Decrement<this['arguments'][0]['length']>];
}
