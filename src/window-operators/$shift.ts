import { StaticInput } from '../expressions/static-input';
import { FunctionSignature } from '../types/evaluate';

export interface $shift {
  $shift: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      output: unknown;
      by: StaticInput<number>;
      default?: unknown;
    }>
  ];
  return: this['arguments'][0]['output'] | this['arguments'][0]['default'];
}
