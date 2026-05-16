import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $encStrNormalizedEq {
  $encStrNormalizedEq: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      input: unknown;
      string: string;
    }>
  ];
  return: boolean;
}
