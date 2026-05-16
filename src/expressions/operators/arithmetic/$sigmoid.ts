import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $sigmoid {
  $sigmoid: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: StaticInput<{ input: number | null; onNull?: unknown }>];
  return:
    | NonNullable<this['arguments'][0]['input']>
    | (null extends this['arguments'][0]['input']
        ? 'onNull' extends keyof this['arguments'][0]
          ? this['arguments'][0]['onNull']
          : null
        : never);
}
