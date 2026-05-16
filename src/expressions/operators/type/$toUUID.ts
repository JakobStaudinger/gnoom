import { UUID } from 'mongodb';
import { FunctionSignature } from '../../../types/evaluate';

export interface $toUUID {
  $toUUID: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [value: unknown];
  return: UUID;
}
