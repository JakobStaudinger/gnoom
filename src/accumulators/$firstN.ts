import { Const } from '../expressions/const';
import { FunctionSignature } from '../types/evaluate';

export interface $firstN {
  $firstN: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: Const<{ input: unknown; n: number }>];
  return: this['arguments'][0]['input'][];
}
