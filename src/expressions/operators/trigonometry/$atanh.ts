import { FunctionSignature } from '../../../types/evaluate';

export interface $atanh {
  $atanh: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
