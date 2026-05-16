import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $meta {
  $meta: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [keyword: StaticInput<'textScore'> | StaticInput<'indexKey'>];
  return: this['arguments'][0] extends StaticInput<'textScore'>
    ? number
    : object | undefined;
}
