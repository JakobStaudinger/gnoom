import { FunctionSignature } from '../../../types/evaluate';

export interface $setIsSubset {
  $setIsSubset: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: unknown[], y: unknown[]];
  return: boolean;
}
