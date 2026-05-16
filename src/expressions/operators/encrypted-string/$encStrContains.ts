import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $encStrContains {
  $encStrContains: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      input: unknown;
      substring: string;
    }>
  ];
  return: boolean;
}
