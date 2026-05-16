import { FunctionSignature } from '../../../types/evaluate';

export interface $sin {
  $sin: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
