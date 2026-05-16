import { StaticInput } from '../expressions/static-input';
import { FunctionSignature } from '../types/evaluate';

export interface $percentile {
  $percentile: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      input: number;
      p: number[];
      method: StaticInput<'approximate'>;
    }>
  ];
  return: this['arguments'][0]['input'][];
}
