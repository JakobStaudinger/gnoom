import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $encStrEndsWith {
  $encStrEndsWith: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: unknown;
      suffix: string;
    }>
  ];
  return: boolean;
}
