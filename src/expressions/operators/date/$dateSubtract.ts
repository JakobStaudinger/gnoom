import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';
import { TimeUnit } from './types';

export interface $dateSubtract {
  $dateSubtract: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      startDate: Date;
      unit: TimeUnit;
      amount: number;
      timezone?: string;
    }>
  ];
  return: Date;
}
