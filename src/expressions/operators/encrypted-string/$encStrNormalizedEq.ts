import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $encStrNormalizedEq {
  $encStrNormalizedEq: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: unknown;
      string: string;
    }>
  ];
  return: boolean;
}
