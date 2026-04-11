import { StaticInput } from '../static-input';

export interface GroupOperatorMap {
  $avg: (<T>(values: T[]) => T) | (<T>(x: T, y: T, ...values: T[]) => T);
  $max: (<T>(values: T[]) => T) | (<T>(x: T, y: T, ...values: T[]) => T);
  $median: <T>(
    input: StaticInput<{ input: T[]; method: StaticInput<'approximate'> }>
  ) => T;
  $min: (<T>(values: T[]) => T) | (<T>(x: T, y: T, ...values: T[]) => T);
  $percentile: <T>(
    input: StaticInput<{
      input: T[];
      p: number[];
      method: StaticInput<'approximate'>;
    }>
  ) => T[];
  $stdDevPop: (<T>(values: T[]) => T) | (<T>(x: T, y: T, ...values: T[]) => T);
  $stdDevSamp: (<T>(values: T[]) => T) | (<T>(x: T, y: T, ...values: T[]) => T);
}
