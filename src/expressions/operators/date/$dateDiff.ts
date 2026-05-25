import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';
import { TimeUnit, Weekday } from './types';

export interface $dateDiff {
  $dateDiff: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      startDate: Date;
      endDate: Date;
      unit: TimeUnit;
      timezone?: number;
      startOfWeek?: Weekday;
    }>
  ];
  return: number;
}
