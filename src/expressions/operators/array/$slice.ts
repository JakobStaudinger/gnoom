export interface $slice {
  $slice:
    | (<T>(array: T[], n: number) => T[])
    | (<T>(array: T[], position: number, n: number) => T[]);
}