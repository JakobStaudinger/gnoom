import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';
import { TimeUnit, Weekday } from './types';

export interface $dateTrunc {
  $dateTrunc: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      date: Date | null;
      unit: TimeUnit;
      binSize?: number;
      timezone?: string;
      startOfWeek?: Weekday;
    }>
  ];
  return: Date | null;
}
