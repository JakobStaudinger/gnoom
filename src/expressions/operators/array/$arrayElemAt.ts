import { FunctionSignature } from '../../../types/evaluate';

export interface $arrayElemAt {
  $arrayElemAt: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [array: unknown[], index: number];
  return: this['arguments'][0][number];
}
