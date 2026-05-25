import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';
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
  return: this['arguments'][0]['input'][number];
}
