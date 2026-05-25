import { FunctionSignature } from '../../../types/evaluate';
import { NonCollapsingString } from '../../../types/non-collapsing';
import { RegExpOption } from '../../../types/regexp';
import { Const } from '../../const';

export interface $regexMatch {
  $regexMatch: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      input: string;
      regex: string | RegExp;
      options?: RegExpOption | NonCollapsingString;
    }>
  ];
  return: boolean;
}
