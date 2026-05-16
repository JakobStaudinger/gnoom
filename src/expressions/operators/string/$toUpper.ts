import { FunctionSignature } from '../../../types/evaluate';

export interface $toUpper {
  $toUpper: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: string];
  return: string;
}
