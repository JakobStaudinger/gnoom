import { FunctionSignature } from '../../../types/evaluate';

export interface $toLower {
  $toLower: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: string];
  return: string;
}
