import { RegExpOption } from '../types/regexp';

export type MiscellaneousQueryPredicate<T> = {
  $mod?: T extends number ? [divisor: number, remainder: number] : never;
  $regex?: RegExp | string;
  $options?: RegExpOption | (string & {});
};
