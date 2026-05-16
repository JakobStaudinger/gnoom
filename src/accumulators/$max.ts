import { FunctionSignature } from '../types/evaluate';
import { Primitive } from '../types/primitive';

export interface $max {
  $max: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: Primitive];
  return: this['arguments'][0];
}
