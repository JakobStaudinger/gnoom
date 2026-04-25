import { StaticInput } from '../../static-input';
import { DateParts } from './types';

export interface $dateToParts {
  $dateToParts: (
    input: StaticInput<{
      date: Date;
      timezone?: string;
      // TODO: maybe implement ISO 8601 version
      iso8601?: never;
    }>
  ) => DateParts;
}
