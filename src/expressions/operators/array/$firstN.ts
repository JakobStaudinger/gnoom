import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $firstN {
  $firstN: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: StaticInput<{ input: unknown[]; n: number }>];
  return: this['arguments'][0]['input'][number][];
}
