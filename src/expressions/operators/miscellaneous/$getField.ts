import { FunctionSignature } from '../../../types/evaluate';
import { Const } from '../../const';

export interface $getField {
  $getField: Signature;
}

interface Signature extends FunctionSignature {
  argumuents: [input: Const<{ field: string; input?: object }>];
  return: unknown;
}
