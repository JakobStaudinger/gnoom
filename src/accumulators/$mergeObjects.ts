import { FunctionSignature } from '../types/evaluate';
import { AnyObject } from '../types/object';

export interface $mergeObjects {
  $mergeObjects: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [obj: AnyObject];
  return: this['arguments'][0];
}
