import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $setField {
  $setField: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      field: string;
      input: object;
      value: unknown;
    }>
  ];
  return: object;
}
