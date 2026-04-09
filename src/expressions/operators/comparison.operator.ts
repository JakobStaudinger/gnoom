export type ComparisonOperator =
  | { $cmp: <T>(a: T, b: T) => -1 | 0 | 1 }
  | { $eq: <T>(a: T, b: T) => boolean }
  | { $gt: <T>(a: T, b: T) => boolean }
  | { $gte: <T>(a: T, b: T) => boolean }
  | { $lt: <T>(a: T, b: T) => boolean }
  | { $lte: <T>(a: T, b: T) => boolean }
  | { $ne: <T>(a: T, b: T) => boolean };
