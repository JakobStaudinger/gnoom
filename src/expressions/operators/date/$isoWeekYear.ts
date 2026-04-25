import { StaticInput } from '../../static-input';

export interface $isoWeekYear {
  $isoWeekYear: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
