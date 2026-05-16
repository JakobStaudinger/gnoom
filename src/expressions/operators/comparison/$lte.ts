import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';

export interface $lte {
  $lte: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [a: Primitive, b: Primitive];
  return: boolean;
}
