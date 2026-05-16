import { FunctionSignature } from '../../../types/evaluate';

export interface $isArray {
  $isArray: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: boolean;
}
