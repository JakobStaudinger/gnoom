import { FunctionSignature } from '../types/evaluate';

export interface $covarianceSamp {
  $covarianceSamp: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number, y: number];
  return: number;
}
