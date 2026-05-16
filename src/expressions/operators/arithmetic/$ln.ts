import { FunctionSignature } from '../../../types/evaluate';

export interface $ln {
  $ln: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: number | null];
  return: this['arguments'][0];
}
