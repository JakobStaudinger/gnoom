import {
  Overload,
  OverloadTransformation,
  UnknownOverloaded
} from '../../../types/overload';
import { StaticInput } from '../../static-input';

export interface $reduce {
  $reduce: Overload<UnknownOverloaded, Signature>;
}

interface Signature extends OverloadTransformation {
  output: (input: Input<unknown, this['T']>) => this['T'];
}

type Input<I, O> = StaticInput<{ input: I[]; initialValue: O; in: O }>;
