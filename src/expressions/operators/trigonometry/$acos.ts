import { FunctionSignature } from '../../../types/evaluate';

export interface $acos {
  $acos: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
