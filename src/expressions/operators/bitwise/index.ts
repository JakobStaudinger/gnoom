import { $bitAnd } from './$bitAnd';
import { $bitNot } from './$bitNot';
import { $bitOr } from './$bitOr';
import { $bitXor } from './$bitXor';

export interface BitwiseOperatorMap extends $bitAnd, $bitNot, $bitOr, $bitXor {}
