import { Primitive } from '../../../types/primitive';

export interface $eq {
  $eq: <T extends Primitive>(a: T, b: T) => boolean;
}
