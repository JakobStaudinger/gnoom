type Bitmask =
  | number
  | { $binary: { base64: string; subType: string } }
  | number[];

export type BitwiseQueryPredicate<_T> = {
  $bitsAllClear?: Bitmask;
  $bitsAllSet?: Bitmask;
  $bitsAnyClear?: Bitmask;
  $bitsAnySet?: Bitmask;
};
