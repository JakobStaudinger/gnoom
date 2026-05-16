import { FunctionSignature } from '../../../types/evaluate';

export interface $floor {
  $floor: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | null];
  return: this['arguments'][0];
}
