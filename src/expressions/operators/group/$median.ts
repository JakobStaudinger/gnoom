import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';
import { Widen } from '../../../types/widen';
import { Const } from '../../const';

export interface $median {
  $median: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: Primitive[];
      method: Const<'approximate'>;
    }>
  ];
  return: Widen<this['arguments'][0]['input'][number]>;
}
