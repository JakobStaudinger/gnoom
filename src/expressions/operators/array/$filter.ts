import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $filter {
  $filter: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: unknown[];
      as?: Const<string>;
      cond: boolean;
      limit?: number;
    }>
  ];
  return: this['arguments'][0]['input'][number][];
}
