export interface $mod<T> {
  $mod?: T extends number ? [divisor: number, remainder: number] : never;
}
