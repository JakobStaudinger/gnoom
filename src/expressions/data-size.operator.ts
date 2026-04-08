export type DataSizeOperator =
  | { $binarySize: (value: unknown) => number }
  | { $bsonSize: (value: unknown) => number };
