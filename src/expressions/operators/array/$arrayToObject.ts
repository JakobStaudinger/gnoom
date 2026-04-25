export interface $arrayToObject {
  $arrayToObject: <K extends PropertyKey, V>(arr: [K, V][]) => Record<K, V>;
}
