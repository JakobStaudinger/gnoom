import { StaticInput } from '../../static-input';

export interface $isoWeek {
  $isoWeek: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
