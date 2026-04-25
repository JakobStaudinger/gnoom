import { StaticInput } from '../../static-input';
import { DateParts } from './types';

export interface $dateFromParts {
  $dateFromParts: (
    // TODO: maybe implement ISO 8601 version
    input: StaticInput<
      Required<Pick<DateParts, 'year'>> &
        Partial<DateParts> & { timezone?: string }
    >
  ) => Date;
}
