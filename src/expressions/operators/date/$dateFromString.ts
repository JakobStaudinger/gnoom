import { StaticInput } from '../../static-input';

export interface $dateFromString {
  $dateFromString: <E = never, N = null>(
    input: StaticInput<{
      dateString: string;
      format?: string;
      timezone?: string;
      onError?: E;
      onNull?: N;
    }>
  ) => Date | E | N;
}
