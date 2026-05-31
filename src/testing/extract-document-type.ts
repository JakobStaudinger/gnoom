import { Aggregate } from '../aggregate';
import { ErrorsFromFields } from '../types/error';

export type ExtractState<T> = T extends Aggregate<infer State> ? State : never;

export type ExtractDocumentType<T> = ExtractState<T>['T'];

export type ExtractError<T> = ErrorsFromFields<ExtractDocumentType<T>>;
