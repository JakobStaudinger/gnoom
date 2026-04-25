export interface $subtract {
  $subtract:
    | ((x: number, y: number) => number)
    | ((x: Date, y: number) => Date)
    | ((x: Date, y: Date) => number);
}
