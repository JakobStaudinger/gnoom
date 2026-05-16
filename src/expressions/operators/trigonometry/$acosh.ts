import { FunctionSignature } from '../../../types/evaluate';

export interface $acosh {
  $acosh: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
