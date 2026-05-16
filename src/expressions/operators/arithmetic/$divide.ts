import { FunctionSignature } from '../../../types/evaluate';

export interface $divide {
  $divide: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [dividend: number, divisor: number];
  return: this['arguments'][0];
}
