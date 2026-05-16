import { StaticInput } from '../expressions/static-input';
import { FunctionSignature } from '../types/evaluate';

export interface $maxN {
  $maxN: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: StaticInput<{ input: unknown; n: number }>];
  return: this['arguments'][0]['input'][];
}
