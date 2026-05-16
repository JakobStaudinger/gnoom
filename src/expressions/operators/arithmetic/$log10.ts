import { FunctionSignature } from '../../../types/evaluate';

export interface $log10 {
  $log10: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | null];
  return: this['arguments'][0];
}
