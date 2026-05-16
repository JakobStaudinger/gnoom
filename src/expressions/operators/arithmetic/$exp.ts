import { FunctionSignature } from '../../../types/evaluate';

export interface $exp {
  $exp: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | null];
  return: this['arguments'][0];
}
