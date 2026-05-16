import { FunctionSignature } from '../../../types/evaluate';

export interface $and {
  $and: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [...expressions: boolean[]];
  return: boolean;
}
