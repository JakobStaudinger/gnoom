import { FunctionSignature } from '../../../types/evaluate';

export interface $ceil {
  $ceil: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | null];
  return: this['arguments'][0];
}
