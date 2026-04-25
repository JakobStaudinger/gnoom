import { $cond } from './$cond';
import { $ifNull } from './$ifNull';
import { $switch } from './$switch';

export interface ConditionalOperatorMap extends $cond, $ifNull, $switch {}
