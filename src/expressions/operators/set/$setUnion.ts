import { FunctionSignature } from '../../../types/evaluate';

export interface $setUnion {
  $setUnion: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: unknown[], y: unknown[], ...values: unknown[][]];
  return: this['arguments'][number][number][];
}
