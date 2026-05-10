import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';

export interface $ifNull {
  $ifNull: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (value: this['T'], ...fallbacks: this['T'][]) => this['T'];
}
