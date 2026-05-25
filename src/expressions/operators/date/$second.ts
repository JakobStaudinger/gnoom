import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $second {
  $second: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [date: Date | Const<{ date: Date; timezone?: string }>];
  return: number;
}
