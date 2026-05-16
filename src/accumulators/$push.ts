import { FunctionSignature } from '../types/evaluate';

export interface $push {
  $push: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: this['arguments'][0][];
}
