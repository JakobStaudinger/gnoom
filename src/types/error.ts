import { AggregateState } from './aggregate-state';

declare const GNOOM_ERROR: unique symbol;

export interface GnoomError<E extends { message: string }> {
  [GNOOM_ERROR]: E;
}

export type ErrorsFromFields<O> = O[keyof O] extends infer T
  ? T extends GnoomError<infer _E>
    ? T
    : never
  : never;

export type ErrorIfAllOverloadsErrored<T> = [
  Exclude<T, GnoomError<{ message: string }>>
] extends [never]
  ? T extends GnoomError<infer E>
    ? GnoomError<E>
    : never
  : Exclude<T, GnoomError<{ message: string }>>;

export type ErrorMessage<E> =
  E extends GnoomError<{ message: infer M extends string }> ? M : never;

export type AssertNoErrorState<State extends AggregateState> =
  State['error'] extends never ? [] : [State['error']];
