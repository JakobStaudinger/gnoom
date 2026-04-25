export interface $indexOfBytes {
  $indexOfBytes:
    | ((input: string, substring: string) => number)
    | ((
        input: string,
        substring: string,
        start: number,
        end: number
      ) => number);
}