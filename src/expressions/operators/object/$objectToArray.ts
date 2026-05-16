import { FunctionSignature } from '../../../types/evaluate';
import { AnyObject } from '../../../types/object';

export interface $objectToArray {
  $objectToArray: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [obj: AnyObject];
  return: Entries<this['arguments'][0]>;
}

type Entries<O> = [keyof O, O[keyof O]];
