import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';
import { DateParts } from './types';

export interface $dateToParts {
  $dateToParts: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      date: Date;
      timezone?: string;
      // TODO: maybe implement ISO 8601 version
      iso8601?: never;
    }>
  ];
  return: DateParts;
}
