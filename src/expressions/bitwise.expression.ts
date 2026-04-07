export type BitwiseExpression =
  | { $bitAnd: (x: number, y: number, ...rest: number[]) => number }
  | { $bitNot: (x: number) => number }
  | { $bitOr: (x: number, y: number, ...rest: number[]) => number }
  | { $bitXor: (x: number, y: number, ...rest: number[]) => number };
