import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $dateFromString {
  $dateFromString: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
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
