import { Primitive } from '../../../types/primitive';

export interface $ne {
  $ne: <T extends Primitive>(a: T, b: T) => boolean;
}
