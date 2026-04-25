import { StaticInput } from '../../static-input';

export interface $dayOfWeek {
  $dayOfWeek: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
