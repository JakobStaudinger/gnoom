import { TypeIdentifier } from './types';

export interface $type {
  $type: <T>(value: T) => TypeIdentifier;
}
