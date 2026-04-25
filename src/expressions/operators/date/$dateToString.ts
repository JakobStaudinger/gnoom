import { StaticInput } from '../../static-input';

export interface $dateToString {
  $dateToString: <N = null>(
    input: StaticInput<{
      date: Date | null;
      format?: string;
      timezone?: string;
      onNull?: N;
    }>
  ) => string | N;
}
