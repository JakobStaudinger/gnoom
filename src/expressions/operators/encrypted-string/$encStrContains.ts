import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $encStrContains {
  $encStrContains: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: unknown;
      substring: string;
    }>
  ];
  return: boolean;
}
