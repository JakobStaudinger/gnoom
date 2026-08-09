import { Const } from '../expressions/const';
import { FunctionSignature } from '../types/evaluate';
import { Widen } from '../types/widen';

export interface $median {
  $median: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: Const<{ input: number; method: Const<'approximate'> }>];
  return: Widen<this['arguments'][0]['input']>;
}
