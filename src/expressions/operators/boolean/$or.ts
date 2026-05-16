import { FunctionSignature } from '../../../types/evaluate';

export interface $or {
  $or: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [...expressions: boolean[]];
  return: boolean;
}
