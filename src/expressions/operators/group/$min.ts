export interface $min {
  $min: (<T>(values: T[]) => T) | (<T>(x: T, y: T, ...values: T[]) => T);
}