import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $map {
  $map: Signature;
}

interface Signature extends FunctionSignature {
  // TODO: support `as` alias in `in` expression
  arguments: [Const<{ input: unknown[]; as?: string; in: unknown }>];
  return: this['arguments'][0]['in'][];
}
