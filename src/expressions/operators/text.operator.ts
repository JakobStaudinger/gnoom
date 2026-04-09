import { StaticInput } from '../static-input';

export type TextOperator =
  | { $meta: (keyword: StaticInput<'textScore'>) => number }
  | { $meta: (keyword: StaticInput<'indexKey'>) => object | undefined };
