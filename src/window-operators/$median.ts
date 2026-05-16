import { StaticInput } from '../expressions/static-input';
import { FunctionSignature } from '../types/evaluate';

export interface $median {
  $median: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{ input: number; method: StaticInput<'approximate'> }>
  ];
  return: this['arguments'][0]['input'];
}
