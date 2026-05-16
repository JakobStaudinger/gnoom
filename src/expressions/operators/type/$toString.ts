import { FunctionSignature } from '../../../types/evaluate';

export interface $toString {
  $toString: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: string;
}
