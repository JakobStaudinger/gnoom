import { FunctionSignature } from '../../../types/evaluate';

export interface $setIntersection {
  $setIntersection: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: unknown[], y: unknown[], ...values: unknown[][]];
  return: this['arguments'][number][number][];
}
