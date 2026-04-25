import { StaticInput } from '../../static-input';

export interface $percentile {
  $percentile: <T>(
    input: StaticInput<{
      input: T[];
      p: number[];
      method: StaticInput<'approximate'>;
    }>
  ) => T[];
}
