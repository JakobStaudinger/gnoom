import { FunctionSignature } from '../../../types/evaluate';

export interface $log {
  $log: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | null, base: number | null];
  return: this['arguments'][0];
}
