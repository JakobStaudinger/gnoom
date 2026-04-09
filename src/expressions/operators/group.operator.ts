import { StaticInput } from '../static-input';

export type GroupOperator =
  | { $avg: <T>(values: T[]) => T }
  | { $avg: <T>(x: T, y: T, ...values: T[]) => T }
  | { $max: <T>(values: T[]) => T }
  | { $max: <T>(x: T, y: T, ...values: T[]) => T }
  | {
      $median: <T>(
        input: StaticInput<{ input: T[]; method: StaticInput<'approximate'> }>
      ) => T;
    }
  | { $min: <T>(values: T[]) => T }
  | { $min: <T>(x: T, y: T, ...values: T[]) => T }
  | {
      $percentile: <T>(
        input: StaticInput<{
          input: T[];
          p: number[];
          method: StaticInput<'approximate'>;
        }>
      ) => T[];
    }
  | { $stdDevPop: <T>(values: T[]) => T }
  | { $stdDevPop: <T>(x: T, y: T, ...values: T[]) => T }
  | { $stdDevSamp: <T>(values: T[]) => T }
  | { $stdDevSamp: <T>(x: T, y: T, ...values: T[]) => T }
  | { $sum: <T>(x: T, y: T, ...values: T[]) => T };
