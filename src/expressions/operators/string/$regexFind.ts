import { FunctionSignature } from '../../../types/evaluate';
import { NonCollapsingString } from '../../../types/non-collapsing';
import { RegExpOption, RegExpResult } from '../../../types/regexp';
import { Const } from '../../const';

export interface $regexFind {
  $regexFind: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: string;
      regex: string | RegExp;
      options?: RegExpOption | NonCollapsingString;
    }>
  ];
  return: RegExpResult | null;
}
