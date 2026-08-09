import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';
import { Widen } from '../../../types/widen';

export interface $stdDevSamp {
  $stdDevSamp: Signature;
}

interface Signature extends FunctionSignature {
  arguments:
    | [values: Primitive[]]
    | [x: Primitive, y: Primitive, ...values: Primitive[]];
  return: this['arguments'][0] extends (infer T)[]
    ? Widen<T>
    : Widen<this['arguments'][number]>;
}
