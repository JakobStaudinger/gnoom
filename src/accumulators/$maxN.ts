import { StaticInput } from '../expressions/static-input';

export interface $maxN {
  $maxN: (input: StaticInput<{ input: number; n: number }>) => number[];
}
