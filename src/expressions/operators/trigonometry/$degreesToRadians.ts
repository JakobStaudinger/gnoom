import { FunctionSignature } from '../../../types/evaluate';

export interface $degreesToRadians {
  $degreesToRadians: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number];
  return: number;
}
