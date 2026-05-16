import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $replaceOne {
  $replaceOne: Signature;
}

interface Signature extends FunctionSignature {
  arguments: [
    input: StaticInput<{
      input: string;
      find: string;
      replacement: string;
    }>
  ];
  return: string;
}
