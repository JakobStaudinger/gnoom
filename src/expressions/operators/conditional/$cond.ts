import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $cond {
  $cond: Signature;
}

interface Signature extends FunctionSignature {
  arguments:
    | [input: StaticInput<{ if: boolean; then: unknown; else: unknown }>]
    | [_if: boolean, _then: unknown, _else: unknown];
  return: this['arguments'][0] extends boolean
    ? this['arguments'][1] | this['arguments'][2]
    : this['arguments'][0] extends StaticInput<{ then: infer T; else: infer E }>
      ? T | E
      : never;
}
