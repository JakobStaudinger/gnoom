import { StaticInput } from '../../static-input';

export interface $minN {
  $minN: <T>(input: StaticInput<{ input: T[]; n: number }>) => T[];
}
