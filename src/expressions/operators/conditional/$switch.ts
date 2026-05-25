import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $switch {
  $switch: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      branches: Const<Const<{ case: boolean; then: unknown }>[]>;
      default?: unknown;
    }>
  ];
  return:
    | this['arguments'][0]['branches'][number]['then']
    | this['arguments'][0]['default'];
}
