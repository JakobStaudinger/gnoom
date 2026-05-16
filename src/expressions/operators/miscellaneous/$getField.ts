import { FunctionSignature } from '../../../types/evaluate';
import { StaticInput } from '../../static-input';

export interface $getField {
  $getField: Signature;
}

interface Signature extends FunctionSignature {
  argumuents: [input: StaticInput<{ field: string; input?: object }>];
  return: unknown;
}
