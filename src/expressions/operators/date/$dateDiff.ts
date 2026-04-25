import { StaticInput } from '../../static-input';
import { TimeUnit, Weekday } from './types';

export interface $dateDiff {
  $dateDiff: (
    input: StaticInput<{
      startDate: Date;
      endDate: Date;
      unit: TimeUnit;
      timezone?: number;
      startOfWeek?: Weekday;
    }>
  ) => number;
}
