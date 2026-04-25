import { Primitive } from '../../../types/primitive';

export interface $gt {
  $gt: <T extends Primitive>(a: T, b: T) => boolean;
}
