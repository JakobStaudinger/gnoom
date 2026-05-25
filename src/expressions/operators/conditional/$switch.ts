import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $switch {
  $switch: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      branches: StaticInput<StaticInput<{ case: boolean; then: unknown }>[]>;
      default?: unknown;
    }>
  ];
  return:
    | this['arguments'][0]['branches'][number]['then']
    | this['arguments'][0]['default'];
}
