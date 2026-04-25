import { StaticInput } from '../../static-input';

export interface $millisecond {
  $millisecond: (
    date: Date | StaticInput<{ date: Date; timezone?: string }>
  ) => number;
}
