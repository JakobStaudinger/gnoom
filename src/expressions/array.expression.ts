import { StaticInput } from '.';

export type ArrayExpression =
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
    };
