import { StaticInput } from '../expressions/static-input';
import { FunctionSignature } from '../types/evaluate';
import { Primitive } from '../types/primitive';

export interface $minN {
  $minN: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: StaticInput<{ input: Primitive; n: number }>];
  return: this['arguments'][0]['input'][];
}
