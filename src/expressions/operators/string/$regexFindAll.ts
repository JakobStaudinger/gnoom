import { NonCollapsingString } from '../../../types/non-collapsing';
import { RegExpOption, RegExpResult } from '../../../types/regexp';
import { StaticInput } from '../../static-input';

export interface $regexFindAll {
  $regexFindAll: (
    input: StaticInput<{
      input: string;
      regex: string | RegExp;
      options?: RegExpOption | NonCollapsingString;
    }>
  ) => RegExpResult[];
}
