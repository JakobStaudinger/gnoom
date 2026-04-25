import { StaticInput } from '../../static-input';

export interface $maxN {
  $maxN: <T>(input: StaticInput<{ input: T[]; n: number }>) => T[];
}
