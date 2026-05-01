import { $cond } from './$cond';
import { $ifNull } from './$ifNull';
import { $switch } from './$switch';

export interface ConditionalOperators extends $cond, $ifNull, $switch {}
