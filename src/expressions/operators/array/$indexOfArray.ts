export interface $indexOfArray {
  $indexOfArray: <T>(
    haystack: T[],
    needle: T,
    start?: number,
    end?: number
  ) => number;
}