import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $sigmoid {
  $sigmoid: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: Const<{ input: number | null; onNull?: unknown }>];
  return:
    | NonNullable<this['arguments'][0]['input']>
    | (null extends this['arguments'][0]['input']
        ? 'onNull' extends keyof this['arguments'][0]
          ? this['arguments'][0]['onNull']
          : null
        : never);
}
