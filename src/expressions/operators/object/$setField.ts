import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $setField {
  $setField: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      field: string;
      input: object;
      value: unknown;
    }>
  ];
  return: object;
}
