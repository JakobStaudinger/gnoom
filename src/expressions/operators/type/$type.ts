import { FunctionSignature } from '../../../types/evaluate';
import { TypeIdentifier } from './types';

export interface $type {
  $type: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: TypeIdentifier;
}
