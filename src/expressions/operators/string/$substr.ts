import { FunctionSignature } from '../../../types/evaluate';

export interface $substr {
  $substr: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: string, start: number, length: number];
  return: string;
}
