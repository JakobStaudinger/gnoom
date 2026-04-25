import { StaticInput } from '../../static-input';

export interface $hour {
  $hour: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
