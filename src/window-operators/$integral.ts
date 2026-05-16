import { StaticInput } from '../expressions/static-input';
import { FunctionSignature } from '../types/evaluate';
import { WindowTimeUnit } from './types';

export interface $integral {
  $integral: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{ input: number; unit?: StaticInput<WindowTimeUnit> }>
  ];
  return: this['arguments'][0]['input'];
}
