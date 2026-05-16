import { Timestamp } from 'mongodb';
import { FunctionSignature } from '../../../types/evaluate';

export interface $tsIncrement {
  $tsIncrement: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [timestamp: Timestamp];
  return: number;
}
