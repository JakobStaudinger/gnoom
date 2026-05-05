import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../types/overload';

export interface $push {
  $push: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (value: this['T']) => this['T'][];
}
