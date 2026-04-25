import { Primitive } from '../../../types/primitive';

export interface $lte {
  $lte: <T extends Primitive>(a: T, b: T) => boolean;
}
