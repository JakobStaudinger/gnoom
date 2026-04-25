import { StaticInput } from '../../static-input';
import { TimeUnit, Weekday } from './types';

export interface $dateTrunc {
  $dateTrunc: (
    input: StaticInput<{
      date: Date | null;
      unit: TimeUnit;
      binSize?: number;
      timezone?: string;
      startOfWeek?: Weekday;
    }>
  ) => Date | null;
}
