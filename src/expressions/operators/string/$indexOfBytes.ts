import { FunctionSignature } from '../../../types/evaluate';

export interface $indexOfBytes {
  $indexOfBytes: Signature;
}

interface Signature extends FunctionSignature {
  arguments:
    | [input: string, substring: string]
    | [input: string, substring: string, start: number, end: number];
  return: number;
}
