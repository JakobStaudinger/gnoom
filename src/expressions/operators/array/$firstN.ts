import { StaticInput } from '../../static-input';

export interface $firstN {
  $firstN: <T>(input: StaticInput<{ input: T[]; n: number }>) => T[];
}
