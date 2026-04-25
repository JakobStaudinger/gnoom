import { StaticInput } from '../expressions/static-input';

export interface $expMovingAvg {
  $expMovingAvg: <V extends number>(
    input: StaticInput<
      | { input: V; N: StaticInput<number> }
      | { input: V; alpha: StaticInput<number> }
    >
  ) => V;
}
