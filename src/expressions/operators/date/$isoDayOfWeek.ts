import { StaticInput } from '../../static-input';

export interface $isoDayOfWeek {
  $isoDayOfWeek: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
