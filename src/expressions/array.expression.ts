export type ArrayExpression =
  | { $arrayElemAt: <T>(arr: T[], index: number) => T }
  | { $arrayToObject: <K, V>(arr: [K, V][]) => object }
  | {
      $concatArrays: <T extends unknown[][] & [unknown[], unknown[]]>(
        ...arr: T
      ) => T;
    };
