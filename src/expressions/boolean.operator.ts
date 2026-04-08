export type BooleanOperator =
  | { $and: (...expressions: boolean[]) => boolean }
  | { $not: (expression: boolean) => boolean }
  | { $or: (...expressions: boolean[]) => boolean };
