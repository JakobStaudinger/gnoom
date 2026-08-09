export type ArrayOfLength<N, Arr extends unknown[] = []> = number extends N
  ? never
  : Arr['length'] extends N
    ? Arr
    : ArrayOfLength<N, [...Arr, unknown]>;

export type Tail<Arr extends unknown[]> = Arr extends [
  infer _Head,
  ...infer Tail
]
  ? Tail
  : [];

type Decrement<T extends number> =
  ArrayOfLength<T> extends [...infer Arr, unknown] ? Arr['length'] : never;

export type Last<Arr extends unknown[]> = Arr[Decrement<Arr['length']>];
