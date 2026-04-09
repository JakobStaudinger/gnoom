export type SetOperator =
  | { $allElementsTrue: (values: unknown[]) => boolean }
  | { $anyElementTrue: (values: unknown[]) => boolean }
  | { $setDifference: <T>(x: T[], y: T[]) => T[] }
  | { $setEquals: <T>(x: T[], y: T[], ...values: T[][]) => boolean }
  | { $setIntersection: <T>(x: T[], y: T[], ...values: T[][]) => T[] }
  | { $setIsSubset: <T>(x: T[], y: T[]) => boolean }
  | { $setUnion: <T>(x: T[], y: T[], ...values: T[][]) => T[] };
