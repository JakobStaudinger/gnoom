import { FunctionSignature } from '../../../types/evaluate';
import { AnyObject } from '../../../types/object';
import { StaticInput } from '../../static-input';

export interface $sortArray {
  $sortArray: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{ input: unknown[]; sortBy: AnyObject | 1 | -1 }>
  ];
  return: this['arguments'][0]['input'][number][];
}
