import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $firstN {
  $firstN: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: Const<{ input: unknown[]; n: number }>];
  return: this['arguments'][0]['input'][number][];
}
