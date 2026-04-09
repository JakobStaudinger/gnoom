export type BitwiseOperator =
  | { $bitAnd: (...numbers: number[]) => number }
  | { $bitNot: (x: number) => number }
  | { $bitOr: (...numbers: number[]) => number }
  | { $bitXor: (...numbers: number[]) => number };
