import { FunctionSignature } from '../../../types/evaluate';

export interface $sqrt {
  $sqrt: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | null];
  return: this['arguments'][0];
}
