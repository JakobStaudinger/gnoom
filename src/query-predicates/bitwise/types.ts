export type Bitmask =
  | number
  | { $binary: { base64: string; subType: string } }
  | number[];
