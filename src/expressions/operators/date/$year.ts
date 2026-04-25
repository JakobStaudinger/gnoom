import { StaticInput } from '../../static-input';

export interface $year {
  $year: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
