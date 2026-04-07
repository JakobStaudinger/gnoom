export type ArrayExpression =
  | { $arrayElemAt: <T>(arr: T[], index: number) => T }
  | { $arrayToObject: <K, V>(arr: [K, V][]) => object }
  | {
      $concatArrays: <T1, T2, T3 extends unknown[]>(
        array1: T1[],
        array2: T2[],
        ...arrays: T3[]
      ) => unknown[];
    };
