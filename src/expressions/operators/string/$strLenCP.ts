import { FunctionSignature } from '../../../types/evaluate';

export interface $strLenCP {
  $strLenCP: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: string];
  return: number;
}
