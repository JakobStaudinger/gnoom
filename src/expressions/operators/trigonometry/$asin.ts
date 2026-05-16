import { FunctionSignature } from '../../../types/evaluate';

export interface $asin {
  $asin: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
