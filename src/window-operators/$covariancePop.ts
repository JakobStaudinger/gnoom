import { FunctionSignature } from '../types/evaluate';

export interface $covariancePop {
  $covariancePop: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number, y: number];
  return: number;
}
