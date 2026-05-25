import { Const } from '../expressions/const';
import { FunctionSignature } from '../types/evaluate';

export interface $median {
  $median: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: Const<{ input: number; method: Const<'approximate'> }>];
  return: this['arguments'][0]['input'];
}
