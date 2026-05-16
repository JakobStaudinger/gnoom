import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $ltrim {
  $ltrim: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [input: StaticInput<{ input: string; chars?: string }>];
  return: string;
}
