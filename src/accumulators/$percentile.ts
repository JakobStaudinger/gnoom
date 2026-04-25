import { StaticInput } from '../expressions/static-input';

export interface $percentile {
  $percentile: (
    input: StaticInput<{
      input: number;
      p: number[];
      method: StaticInput<'approximate'>;
    }>
  ) => number[];
}
