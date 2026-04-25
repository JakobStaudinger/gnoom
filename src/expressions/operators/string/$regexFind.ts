import { RegExpOption, RegExpResult } from '../../../types/regexp';
import { StaticInput } from '../../static-input';

export interface $regexFind {
  $regexFind: (
    input: StaticInput<{
      input: string;
      regex: string | RegExp;
      options?: RegExpOption | (string & {});
    }>
  ) => RegExpResult | null;
}
