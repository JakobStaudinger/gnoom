import { StaticInput } from '../../static-input';

export interface $month {
  $month: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
