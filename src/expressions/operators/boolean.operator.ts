export interface BooleanOperatorMap {
  $and: (...expressions: boolean[]) => boolean;
  $not: (expression: boolean) => boolean;
  $or: (...expressions: boolean[]) => boolean;
}
