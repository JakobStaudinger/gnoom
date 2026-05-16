import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $dateToString {
  $dateToString: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      date: Date | null;
      format?: string;
      timezone?: string;
      onNull?: unknown;
    }>
  ];
  return:
    | string
    | ('onNull' extends keyof this['arguments'][0]
        ? this['arguments'][0]['onNull']
        : null);
}
