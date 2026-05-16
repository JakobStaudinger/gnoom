import { FunctionSignature } from '../../../types/evaluate';

export interface $trunc {
  $trunc: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | null, digits: number];
  return: this['arguments'][0];
}
