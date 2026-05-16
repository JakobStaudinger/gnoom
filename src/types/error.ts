import { AggregateState } from './aggregate-state';

declare const GNOOM_ERROR: unique symbol;

export interface GnoomError<E extends { message: string }> {
  [GNOOM_ERROR]: E;
}

export type ErrorsFromFields<O> =
  O extends GnoomError<infer _E>
    ? O
    : O extends object
      ? O[keyof O] extends infer T
        ? ErrorsFromFields<T>
        : never
      : never;

export type ErrorMessage<E> =
  E extends GnoomError<{ message: infer M extends string }> ? M : never;

export type AssertNoErrorState<State extends AggregateState> =
  ErrorsFromFields<State['T']> extends never
    ? []
    : [error: ErrorsFromFields<State['T']>];
