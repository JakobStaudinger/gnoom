import { FunctionSignature } from '../../../types/evaluate';

export interface $tan {
  $tan: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
