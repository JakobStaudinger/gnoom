import { FunctionSignature } from '../../../types/evaluate';
import { NonCollapsingString } from '../../../types/non-collapsing';
import { RegExpOption, RegExpResult } from '../../../types/regexp';
import { StaticInput } from '../../static-input';

export interface $regexFindAll {
  $regexFindAll: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      input: string;
      regex: string | RegExp;
      options?: RegExpOption | NonCollapsingString;
    }>
  ];
  return: RegExpResult[];
}
