import { FunctionSignature } from '../../../types/evaluate';

export interface $sinh {
  $sinh: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
