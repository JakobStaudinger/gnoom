import { FunctionSignature } from '../../../types/evaluate';

export interface $toInt {
  $toInt: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: number;
}
