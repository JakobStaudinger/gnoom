import { FunctionSignature } from '../../../types/evaluate';

export interface $mod {
  $mod: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [dividend: number, divisor: number];
  return: number;
}
