import { StaticInput } from '../../static-input';
import { TimeUnit } from './types';

export interface $dateSubtract {
  $dateSubtract: (
    input: StaticInput<{
      startDate: Date;
      unit: TimeUnit;
      amount: number;
      timezone?: string;
    }>
  ) => Date;
}
