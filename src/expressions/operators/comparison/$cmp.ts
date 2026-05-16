import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';

export interface $cmp {
  $cmp: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [a: Primitive, b: Primitive];
  return: -1 | 0 | 1;
}
