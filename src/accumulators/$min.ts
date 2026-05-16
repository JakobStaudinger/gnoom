import { FunctionSignature } from '../types/evaluate';
import { Primitive } from '../types/primitive';

export interface $min {
  $min: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: Primitive];
  return: this['arguments'][0];
}
