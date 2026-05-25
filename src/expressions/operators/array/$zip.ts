import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $zip {
  $zip: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      inputs: unknown[][];
      useLongestLength?: boolean;
      defaults?: unknown[];
    }>
  ];
  return: this['arguments'][0]['inputs'][number][number][];
}
