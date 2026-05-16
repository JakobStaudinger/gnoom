import { FunctionSignature } from '../../../types/evaluate';

export interface $setDifference {
  $setDifference: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: unknown[], y: unknown[]];
  return: this['arguments'][0][number][];
}
