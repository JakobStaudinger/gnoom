import { StaticInput } from '../../static-input';

export interface $dayOfMonth {
  $dayOfMonth: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
