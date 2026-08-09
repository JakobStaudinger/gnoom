import { FunctionSignature } from '../../../types/evaluate';
import { Last } from '../../../types/recursion';

export interface $last {
  $last: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: unknown[]];
  return: Last<this['arguments'][0]>;
}
