import { FunctionSignature } from '../../../types/evaluate';

export interface $not {
  $not: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [expression: boolean];
  return: boolean;
}
