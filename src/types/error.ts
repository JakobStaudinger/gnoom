import { AggregateState } from './aggregate-state';
import { Primitive } from './primitive';
import { ArrayOfLength, Tail } from './recursion';

declare const GNOOM_ERROR: unique symbol;

export interface GnoomError<E extends { message: string }> {
  [GNOOM_ERROR]: E;
}

export type ErrorsFromFields<
  O,
  MaxDepth extends unknown[] = ArrayOfLength<3>
> = MaxDepth extends []
  ? never
  : O extends GnoomError<infer _E>
    ? O
    : O extends Primitive
      ? never
      : O extends object
        ? O[keyof O] extends infer T
          ? ErrorsFromFields<T, Tail<MaxDepth>>
          : never
        : never;

export type ErrorMessage<E> =
  E extends GnoomError<{ message: infer M extends string }> ? M : never;

export type AssertNoErrorState<State extends AggregateState> =
  ErrorsFromFields<State['T']> extends never
    ? []
    : [error: ErrorsFromFields<State['T']>];
