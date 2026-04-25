import { Primitive } from '../../../types/primitive';

export interface $cmp {
  $cmp: <T extends Primitive>(a: T, b: T) => -1 | 0 | 1;
}
