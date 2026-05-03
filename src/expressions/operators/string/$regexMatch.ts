import { NonCollapsingString } from '../../../types/non-collapsing';
import { RegExpOption } from '../../../types/regexp';
import { StaticInput } from '../../static-input';

export interface $regexMatch {
  $regexMatch: (
    input: StaticInput<{
      input: string;
      regex: string | RegExp;
      options?: RegExpOption | NonCollapsingString;
    }>
  ) => boolean;
}
