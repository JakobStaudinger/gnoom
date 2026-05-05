import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';

export interface $indexOfArray {
  $indexOfArray: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (
    haystack: this['T'][],
    needle: this['T'],
    start?: number,
    end?: number
  ) => number;
}
