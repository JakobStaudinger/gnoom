import { Primitive } from '../../../types/primitive';

export interface $lt {
  $lt: <T extends Primitive>(a: T, b: T) => boolean;
}
