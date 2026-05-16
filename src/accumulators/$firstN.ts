import { StaticInput } from '../expressions/static-input';
import { FunctionSignature } from '../types/evaluate';

export interface $firstN {
  $firstN: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: StaticInput<{ input: unknown; n: number }>];
  return: this['arguments'][0]['input'][];
}
