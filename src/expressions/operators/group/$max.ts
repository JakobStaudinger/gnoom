export interface $max {
  $max: (<T>(values: T[]) => T) | (<T>(x: T, y: T, ...values: T[]) => T);
}