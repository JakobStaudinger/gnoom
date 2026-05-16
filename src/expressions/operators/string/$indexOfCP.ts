import { FunctionSignature } from '../../../types/evaluate';

export interface $indexOfCP {
  $indexOfCP: Signature;
}

interface Signature extends FunctionSignature {
  arguments:
    | [input: string, substring: string]
    | [input: string, substring: string, start: number, end: number];
  return: number;
}
