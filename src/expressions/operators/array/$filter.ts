import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $filter {
  $filter: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      input: unknown[];
      as?: StaticInput<string>;
      cond: boolean;
      limit?: number;
    }>
  ];
  return: this['arguments'][0]['input'][number][];
}
