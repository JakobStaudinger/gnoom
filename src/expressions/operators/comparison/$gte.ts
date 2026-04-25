import { Primitive } from '../../../types/primitive';

export interface $gte {
  $gte: <T extends Primitive>(a: T, b: T) => boolean;
}
