import { FunctionSignature } from '../../../types/evaluate';

export interface $split {
  $split: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: string, delimeter: string];
  return: string[];
}
