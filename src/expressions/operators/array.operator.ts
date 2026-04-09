import { StaticInput } from '../static-input';

export type ArrayOperator =
  | { $arrayElemAt: <T>(arr: T[], index: number) => T }
  | { $arrayToObject: <K, V>(arr: [K, V][]) => object }
  | {
      $concatArrays: <T>(
        array1: T[],
        array2: T[],
        ...arrays: T[][]
      ) => unknown[];
    }
  | {
      $filter: <T>(
        input: StaticInput<{
          input: T[];
          as?: StaticInput<string>;
          cond: boolean;
          limit?: number;
        }>
      ) => T[];
    }
  | { $firstN: <T>(input: StaticInput<{ input: T[]; n: number }>) => T[] }
  | { $in: <T>(needle: T, haystack: T[]) => boolean }
  | {
      $indexOfArray: <T>(
        haystack: T[],
        needle: T,
        start?: number,
        end?: number
      ) => number;
    }
  | { $isArray: <T>(value: T) => boolean }
  | { $lastN: <T>(input: StaticInput<{ input: T[]; n: number }>) => T[] }
  | {
      $map: <T, R>(input: StaticInput<{ input: T[]; as?: string; in: R }>) => R;
    }
  | { $maxN: <T>(input: StaticInput<{ input: T[]; n: number }>) => T[] }
  | { $minN: <T>(input: StaticInput<{ input: T[]; n: number }>) => T[] }
  | { $objectToArray: (object: object) => { k: string; v: unknown }[] }
  | { $range: (start: number, end: number, step?: number) => number[] }
  | {
      $reduce: <T, R>(
        input: StaticInput<{ input: T[]; initialValue: R; in: R }>
      ) => R;
    }
  | { $reverseArray: <T>(array: T[]) => T[] }
  | { $size: <T>(array: T[]) => number }
  | { $slice: <T>(array: T[], n: number) => T[] }
  | {
      $slice: <T>(array: T[], position: number, n: number) => T[];
    }
  | {
      $sortArray: <T>(
        input: StaticInput<{ input: T[]; sortBy: object | number }>
      ) => T[];
    }
  | {
      $zip: (
        input: StaticInput<{
          inputs: unknown[][];
          useLongestLength?: boolean;
          defaults?: unknown[];
        }>
      ) => unknown[];
    };
