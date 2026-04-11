export interface DataSizeOperatorMap {
  $binarySize: (value: unknown) => number;
  $bsonSize: (value: unknown) => number;
}
