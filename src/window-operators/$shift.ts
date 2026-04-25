import { StaticInput } from '../expressions/static-input';

export interface $shift {
  $shift: <V, D = null>(
    input: StaticInput<{
      output: V;
      by: StaticInput<number>;
      default?: D;
    }>
  ) => V | D;
}
