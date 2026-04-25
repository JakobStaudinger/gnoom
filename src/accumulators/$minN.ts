import { StaticInput } from '../expressions/static-input';

export interface $minN {
  $minN: (input: StaticInput<{ input: number; n: number }>) => number[];
}
