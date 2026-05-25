import { FunctionSignature } from '../../../types/evaluate';
import { AnyObject } from '../../../types/object';
import { Const } from '../../const';

export interface $let {
  $let: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: Const<{ vars: Const<AnyObject>; in: unknown }>];
  return: this['arguments'][0]['in'];
}
