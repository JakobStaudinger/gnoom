import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';
import { Widen } from '../../../types/widen';
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
  return: Widen<this['arguments'][0]['input'][number]>[];
}
