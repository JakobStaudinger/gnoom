import { FunctionSignature } from '../../../types/evaluate';

export interface $ifNull {
  $ifNull: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown, ...fallbacks: unknown[]];
  return: this['arguments'][number];
}
