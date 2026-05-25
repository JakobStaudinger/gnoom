import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $isoWeekYear {
  $isoWeekYear: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [date: Date | Const<{ date: Date; timezone?: string }>];
  return: number;
}
