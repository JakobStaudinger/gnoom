import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $encStrStartsWith {
  $encStrStartsWith: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: unknown;
      prefix: string;
    }>
  ];
  return: boolean;
}
