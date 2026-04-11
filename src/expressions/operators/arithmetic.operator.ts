import { StaticInput } from '../static-input';

export interface ArithmetricOperatorMap {
  $abs: (x: number) => number;
  $add:
    | ((x: number, y: number, ...others: number[]) => number)
    | ((x: Date, y: number, ...others: number[]) => Date);
  $ceil: (x: number) => number;
  $divide: (dividend: number, divisor: number) => number;
  $exp: (x: number) => number;
  $floor: (x: number) => number;
  $round: (x: number) => number;
  $pow: (x: number, exponent: number) => number;
  $ln: (x: number) => number;
  $log10: (x: number) => number;
  $log: (x: number, base: number) => number;
  $mod: (dividend: number, divisor: number) => number;
  $multiply: (x: number, y: number, ...others: number[]) => number;
  $sigmoid: (input: StaticInput<{ input: number; onNull?: unknown }>) => number;
  $sqrt: (x: number) => number;
  $subtract:
    | ((x: number, y: number) => number)
    | ((x: Date, y: number) => Date)
    | ((x: Date, y: Date) => number);
  $trunc: (x: number, digits: number) => number;
}
