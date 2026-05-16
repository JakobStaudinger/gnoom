import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';
import { TimeUnit, Weekday } from './types';

export interface $dateTrunc {
  $dateTrunc: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      date: Date | null;
      unit: TimeUnit;
      binSize?: number;
      timezone?: string;
      startOfWeek?: Weekday;
    }>
  ];
  return: Date | null;
}
