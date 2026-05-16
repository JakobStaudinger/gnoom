import { FunctionSignature } from '../../../types/evaluate';

export interface $bitNot {
  $bitNot: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
