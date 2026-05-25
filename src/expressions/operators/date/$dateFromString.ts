import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $dateFromString {
  $dateFromString: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: Const<{
      dateString: string;
      format?: string;
      timezone?: string;
      onError?: unknown;
      onNull?: unknown;
    }>
  ];
  return:
    | Date
    | this['arguments'][0]['onError']
    | this['arguments'][0]['onNull'];
}
