import { AnyObject } from '../types/object';

export interface $mergeObjects {
  $mergeObjects: <O extends AnyObject>(obj: O) => O;
}
