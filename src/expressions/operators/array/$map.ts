import { StaticInput } from '../../static-input';

export interface $map {
  $map: <T, R>(input: StaticInput<{ input: T[]; as?: string; in: R }>) => R[];
}
