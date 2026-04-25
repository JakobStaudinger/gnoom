export interface $add {
  $add:
    | ((x: number, y: number, ...others: number[]) => number)
    | ((x: Date, y: number, ...others: number[]) => Date);
}
