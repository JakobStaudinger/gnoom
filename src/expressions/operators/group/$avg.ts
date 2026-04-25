export interface $avg {
  $avg: (<T>(values: T[]) => T) | (<T>(x: T, y: T, ...values: T[]) => T);
}