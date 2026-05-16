import { FunctionSignature } from '../../../types/evaluate';
import { AnyObject } from '../../../types/object';

export interface $mergeObjects {
  $mergeObjects: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [x: AnyObject, y: AnyObject, ...values: AnyObject[]];
  return: this['arguments'][number];
}
