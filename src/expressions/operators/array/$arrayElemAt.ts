import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';

export interface $arrayElemAt {
  $arrayElemAt: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (arr: this['T'][], index: number) => this['T'];
}
