import { NonCollapsingString } from '../../types/non-collapsing';
import { RegExpOption } from '../../types/regexp';

export interface $regex {
  $regex?: RegExp | string;
  $options?: RegExpOption | NonCollapsingString;
}
