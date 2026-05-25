import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';
import { Const } from '../../const';

export interface $percentile {
  $percentile: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: Primitive[];
      p: number[];
      method: Const<'approximate'>;
    }>
  ];
  return: this['arguments'][0]['input'][number][];
}
