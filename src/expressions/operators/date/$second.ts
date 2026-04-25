import { StaticInput } from '../../static-input';

export interface $second {
  $second: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
