import { StaticInput } from '../../static-input';

export interface $sigmoid {
  $sigmoid: (input: StaticInput<{ input: number; onNull?: unknown }>) => number;
}
