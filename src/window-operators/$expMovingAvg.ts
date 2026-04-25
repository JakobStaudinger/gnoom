import { StaticInput } from '../expressions/static-input';

export interface $expMovingAvg {
  $expMovingAvg: (
    input: StaticInput<
      | { input: number; N: StaticInput<number> }
      | { input: number; alpha: StaticInput<number> }
    >
  ) => number;
}
