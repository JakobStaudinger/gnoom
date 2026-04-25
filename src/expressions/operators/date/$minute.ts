import { StaticInput } from '../../static-input';

export interface $minute {
  $minute: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
