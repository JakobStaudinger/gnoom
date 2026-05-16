import { StaticInput } from '../expressions/static-input';
import { FunctionSignature } from '../types/evaluate';

export interface $expMovingAvg {
  $expMovingAvg: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<
      | { input: number; N: StaticInput<number> }
      | { input: number; alpha: StaticInput<number> }
    >
  ];
  return: number;
}
