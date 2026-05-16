import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';

export interface $gte {
  $gte: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [a: Primitive, b: Primitive];
  return: boolean;
}
