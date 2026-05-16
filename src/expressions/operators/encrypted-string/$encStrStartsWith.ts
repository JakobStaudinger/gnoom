import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $encStrStartsWith {
  $encStrStartsWith: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      input: unknown;
      prefix: string;
    }>
  ];
  return: boolean;
}
