import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';

export interface $in {
  $in: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (needle: this['T'], haystack: this['T'][]) => boolean;
}
