import { StaticInput } from '../../static-input';
import { TimeUnit } from './types';

export interface $dateAdd {
  $dateAdd: (
    input: StaticInput<{
      startDate: Date;
      unit: TimeUnit;
      amount: number;
      timezone?: string;
    }>
  ) => Date;
}
