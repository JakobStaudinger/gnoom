import { Aggregate } from '../aggregate';
import { ErrorsFromFields } from '../types/error';

export type ExtractDocumentType<T> =
  T extends Aggregate<infer State> ? State['T'] : never;

export type ExtractError<T> =
  T extends Aggregate<infer State> ? ErrorsFromFields<State['T']> : never;
