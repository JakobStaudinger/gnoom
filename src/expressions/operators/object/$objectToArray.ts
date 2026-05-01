export interface $objectToArray {
  $objectToArray: <T extends object>(obj: T) => { k: string; v: unknown }[];
}
