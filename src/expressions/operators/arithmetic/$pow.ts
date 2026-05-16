import { FunctionSignature } from '../../../types/evaluate';

export interface $pow {
  $pow: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | null, exponent: number | null];
  return: this['arguments'][0];
}
