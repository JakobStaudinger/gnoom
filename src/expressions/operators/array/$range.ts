import { FunctionSignature } from '../../../types/evaluate';

export interface $range {
  $range: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [start: number, end: number, step?: number];
  return: number[];
}
