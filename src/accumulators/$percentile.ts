import { Const } from '../expressions/const';
import { FunctionSignature } from '../types/evaluate';

export interface $percentile {
  $percentile: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: number;
      p: number[];
      method: Const<'approximate'>;
    }>
  ];
  return: this['arguments'][0]['input'][];
}
