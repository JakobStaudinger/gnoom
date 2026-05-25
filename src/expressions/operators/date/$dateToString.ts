import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $dateToString {
  $dateToString: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
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
