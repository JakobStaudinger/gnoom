import { FunctionSignature } from '../../../types/evaluate';

export interface $concat {
  $concat: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: string, y: string, ...values: string[]];
  return: string;
}
