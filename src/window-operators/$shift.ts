import { Const } from '../expressions/const';
import { FunctionSignature } from '../types/evaluate';

export interface $shift {
  $shift: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      output: unknown;
      by: Const<number>;
      default?: unknown;
    }>
  ];
  return: this['arguments'][0]['output'] | this['arguments'][0]['default'];
}
