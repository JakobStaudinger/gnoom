import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';
import { Const } from '../../const';

export interface $maxN {
  $maxN: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: Const<{ input: Primitive[]; n: number }>];
  return: this['arguments'][0]['input'][number][];
}
