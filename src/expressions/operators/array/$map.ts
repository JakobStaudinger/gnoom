import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $map {
  $map: Signature;
}

interface Signature extends FunctionSignature {
  // TODO: support `as` alias in `in` expression
  arguments: [StaticInput<{ input: unknown[]; as?: string; in: unknown }>];
  return: this['arguments'][0]['in'][];
}
