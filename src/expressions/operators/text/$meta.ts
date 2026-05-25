import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $meta {
  $meta: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [keyword: Const<'textScore'> | Const<'indexKey'>];
  return: this['arguments'][0] extends Const<'textScore'>
    ? number
    : object | undefined;
}
