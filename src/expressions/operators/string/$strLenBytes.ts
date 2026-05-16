import { FunctionSignature } from '../../../types/evaluate';

export interface $strLenBytes {
  $strLenBytes: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: string];
  return: number;
}
