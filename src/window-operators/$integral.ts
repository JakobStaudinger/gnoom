import { StaticInput } from '../expressions/static-input';
import { WindowTimeUnit } from './types';

export interface $integral {
  $integral: (
    input: StaticInput<{ input: number; unit: WindowTimeUnit }>
  ) => number;
}
