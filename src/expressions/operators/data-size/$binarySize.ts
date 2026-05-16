import { FunctionSignature } from '../../../types/evaluate';

export interface $binarySize {
  $binarySize: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: number;
}
