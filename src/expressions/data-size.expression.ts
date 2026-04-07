export type DataSizeExpression =
  | { $binarySize: (value: unknown) => number }
  | { $bsonSize: (value: unknown) => number };
