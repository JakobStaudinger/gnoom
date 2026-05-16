import { FunctionSignature } from '../../../types/evaluate';

export interface $substrCP {
  $substrCP: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: string, start: number, length: number];
  return: string;
}
