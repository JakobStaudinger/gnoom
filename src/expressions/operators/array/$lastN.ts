import { StaticInput } from '../../static-input';

export interface $lastN {
  $lastN: <T>(input: StaticInput<{ input: T[]; n: number }>) => T[];
}
