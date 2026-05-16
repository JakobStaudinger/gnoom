import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $unsetField {
  $unsetField: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      field: string;
      input: object;
    }>
  ];
  return: object;
}
