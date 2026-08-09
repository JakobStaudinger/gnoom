import { FunctionSignature } from '../types/evaluate';
import { Primitive } from '../types/primitive';
import { Widen } from '../types/widen';

export interface $min {
  $min: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: Primitive];
  return: Widen<this['arguments'][0]>;
}
