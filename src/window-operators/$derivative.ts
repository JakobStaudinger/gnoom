import { Const } from '../expressions/const';
import { FunctionSignature } from '../types/evaluate';
import { WindowTimeUnit } from './types';

export interface $derivative {
  $derivative: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: Const<{ input: number; unit?: Const<WindowTimeUnit> }>];
  return: this['arguments'][0]['input'];
}
