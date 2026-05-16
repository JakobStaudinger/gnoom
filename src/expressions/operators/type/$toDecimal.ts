import { FunctionSignature } from '../../../types/evaluate';

export interface $toDecimal {
  $toDecimal: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: number;
}
