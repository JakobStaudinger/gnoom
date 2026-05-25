import { Const } from '../expressions/const';
import { FunctionSignature } from '../types/evaluate';
import { Primitive } from '../types/primitive';

export interface $minN {
  $minN: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: Const<{ input: Primitive; n: number }>];
  return: this['arguments'][0]['input'][];
}
