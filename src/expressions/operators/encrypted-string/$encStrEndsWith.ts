import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $encStrEndsWith {
  $encStrEndsWith: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      input: unknown;
      suffix: string;
    }>
  ];
  return: boolean;
}
