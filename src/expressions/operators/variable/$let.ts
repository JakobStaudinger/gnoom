import { FunctionSignature } from '../../../types/evaluate';
import { AnyObject } from '../../../types/object';
import { StaticInput } from '../../static-input';

export interface $let {
  $let: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{ vars: StaticInput<AnyObject>; in: unknown }>
  ];
  return: this['arguments'][0]['in'];
}
