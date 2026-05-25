import { FunctionSignature } from '../../../types/evaluate';
import { AnyObject } from '../../../types/object';
import { Const } from '../../const';

export interface $sortArray {
  $sortArray: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: Const<{ input: unknown[]; sortBy: AnyObject | 1 | -1 }>];
  return: this['arguments'][0]['input'][number][];
}
