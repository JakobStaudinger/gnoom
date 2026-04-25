import { StaticInput } from '../expressions/static-input';
import { WindowTimeUnit } from './types';

export interface $derivative {
  $derivative: (
    input: StaticInput<{ input: number; unit: WindowTimeUnit }>
  ) => number;
}
