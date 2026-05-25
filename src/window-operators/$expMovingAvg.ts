import { Const } from '../expressions/const';
import { FunctionSignature } from '../types/evaluate';

export interface $expMovingAvg {
  $expMovingAvg: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<
      | { input: number; N: Const<number> }
      | { input: number; alpha: Const<number> }
    >
  ];
  return: number;
}
