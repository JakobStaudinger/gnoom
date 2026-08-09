import { FunctionSignature } from '../types/evaluate';
import { Widen } from '../types/widen';

export interface $stdDevSamp {
  $stdDevSamp: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: number];
  return: Widen<this['arguments'][0]>;
}
