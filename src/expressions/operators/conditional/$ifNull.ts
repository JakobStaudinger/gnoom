import { FunctionSignature } from '../../../types/evaluate';
import { Decrement } from '../../../types/recursion';

export interface $ifNull {
  $ifNull: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown, ...fallbacks: unknown[], fallback: unknown];
  return: ReturnType<this['arguments']>;
}

type ReturnType<Args extends unknown[]> =
  | NonNullable<Args[number]>
  | Extract<Last<Args>, null | undefined>;

type Last<T extends unknown[]> = T[Decrement<T['length']>];
