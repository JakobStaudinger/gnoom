import { FunctionSignature } from '../../../types/evaluate';

export interface $toBool {
  $toBool: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: boolean;
}
