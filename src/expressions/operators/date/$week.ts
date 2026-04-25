import { StaticInput } from '../../static-input';

export interface $week {
  $week: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
