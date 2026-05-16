import { FunctionSignature } from '../../../types/evaluate';

export interface $in {
  $in: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [needle: unknown, haystack: unknown[]];
  return: boolean;
}
