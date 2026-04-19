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
