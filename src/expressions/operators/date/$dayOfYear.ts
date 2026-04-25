import { StaticInput } from '../../static-input';

export interface $dayOfYear {
  $dayOfYear: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
