import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $unsetField {
  $unsetField: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      field: string;
      input: object;
    }>
  ];
  return: object;
}
