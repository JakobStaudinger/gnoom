import { FunctionSignature } from '../../../types/evaluate';

export interface $allElementsTrue {
  $allElementsTrue: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [values: unknown[]];
  return: boolean;
}
