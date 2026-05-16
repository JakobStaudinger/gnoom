import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';
import { StaticInput } from '../../static-input';

export interface $maxN {
  $maxN: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: StaticInput<{ input: Primitive[]; n: number }>];
  return: this['arguments'][0]['input'][number][];
}
