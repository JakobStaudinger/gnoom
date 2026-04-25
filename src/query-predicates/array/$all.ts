export interface $all<T> {
  $all?: T extends (infer E)[] ? E[] | E[][] : never;
}
