import { Aggregate } from '../aggregate';

export type ExtractDocumentType<T> =
  T extends Aggregate<infer State> ? State['T'] : never;
