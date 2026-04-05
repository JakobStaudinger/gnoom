type Divisor = number;
type Remainder = number;

type RegExpOption = 'i' | 'm' | 'x' | 's' | 'u';

export type MiscellaneousQueryPredicate<T> = {
  $mod?: T extends number ? [Divisor, Remainder] : never;
} & (T extends string
  ?
      | {
          $regex: RegExp | string;
          $options?: RegExpOption | string;
        }
      | unknown
  : unknown);
