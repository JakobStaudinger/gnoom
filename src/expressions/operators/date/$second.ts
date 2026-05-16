import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $second {
  $second: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [date: Date | StaticInput<{ date: Date; timezone?: string }>];
  return: number;
}
