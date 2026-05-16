import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $zip {
  $zip: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      inputs: unknown[][];
      useLongestLength?: boolean;
      defaults?: unknown[];
    }>
  ];
  return: this['arguments'][0]['inputs'][number][number][];
}
