import { StaticInput } from '../expressions/static-input';
import { WindowTimeUnit } from './types';

export interface $integral {
  $integral: <V extends number>(
    input: StaticInput<{ input: V; unit: WindowTimeUnit }>
  ) => V;
}
