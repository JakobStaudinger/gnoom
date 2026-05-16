import { FunctionSignature } from '../types/evaluate';

export interface $linearFill {
  $linearFill: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: number];
  return: this['arguments'][0];
}
