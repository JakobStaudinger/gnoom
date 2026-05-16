import { FunctionSignature } from '../types/evaluate';

export interface $setUnion {
  $setUnion: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown[]];
  return: this['arguments'][0];
}
