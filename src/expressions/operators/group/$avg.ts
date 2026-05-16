import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';

export interface $avg {
  $avg: Signature;
}

interface Signature extends FunctionSignature {
  arguments:
    | [values: Primitive[]]
    | [x: Primitive, y: Primitive, ...values: Primitive[]];
  return: this['arguments'][0] extends (infer T)[]
    ? T
    : this['arguments'][number];
}
