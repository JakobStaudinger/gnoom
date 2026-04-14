export interface Refiner<T extends object> {
  addProperties<New extends object>(): Refiner<Omit<T, keyof New> & New>;
  removeProperties<K extends PropertyKey>(): Refiner<Omit<T, K>>;
}
