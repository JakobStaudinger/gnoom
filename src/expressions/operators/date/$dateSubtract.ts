import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';
import { TimeUnit } from './types';

export interface $dateSubtract {
  $dateSubtract: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      startDate: Date;
      unit: TimeUnit;
      amount: number;
      timezone?: string;
    }>
  ];
  return: Date;
}
