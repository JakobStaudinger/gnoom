import { FunctionSignature } from '../../../types/evaluate';
import { Primitive } from '../../../types/primitive';
import { StaticInput } from '../../static-input';

export interface $percentile {
  $percentile: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      input: Primitive[];
      p: number[];
      method: StaticInput<'approximate'>;
    }>
  ];
  return: this['arguments'][0]['input'][number][];
}
