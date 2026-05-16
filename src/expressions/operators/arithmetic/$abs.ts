import { FunctionSignature } from '../../../types/evaluate';

export interface $abs {
  $abs: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | null];
  return: this['arguments'][0];
}
