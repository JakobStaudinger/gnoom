import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $dayOfMonth {
  $dayOfMonth: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [date: Date | StaticInput<{ date: Date; timezone?: string }>];
  return: number;
}
