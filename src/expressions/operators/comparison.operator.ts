import { Primitive } from '../../types/primitive';

export interface ComparisonOperatorMap {
  $cmp: <T extends Primitive>(a: T, b: T) => -1 | 0 | 1;
  $eq: <T extends Primitive>(a: T, b: T) => boolean;
  $gt: <T extends Primitive>(a: T, b: T) => boolean;
  $gte: <T extends Primitive>(a: T, b: T) => boolean;
  $lt: <T extends Primitive>(a: T, b: T) => boolean;
  $lte: <T extends Primitive>(a: T, b: T) => boolean;
  $ne: <T extends Primitive>(a: T, b: T) => boolean;
}
