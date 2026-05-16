import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';
import { TimeUnit, Weekday } from './types';

export interface $dateDiff {
  $dateDiff: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      startDate: Date;
      endDate: Date;
      unit: TimeUnit;
      timezone?: number;
      startOfWeek?: Weekday;
    }>
  ];
  return: number;
}
