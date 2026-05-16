import { FunctionSignature } from '../../../types/evaluate';

export interface $isNumber {
  $isNumber: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown | number];
  return: boolean;
}
