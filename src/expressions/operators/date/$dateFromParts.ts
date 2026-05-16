import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';
import { DateParts } from './types';

export interface $dateFromParts {
  $dateFromParts: Signature;
}

interface Signature extends FunctionSignature {
  // TODO: maybe implement ISO 8601 version
  arguments: [
    input: StaticInput<
      Required<Pick<DateParts, 'year'>> &
        Partial<DateParts> & { timezone?: string }
    >
  ];
  return: Date;
}
