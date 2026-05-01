import { $and } from './$and';
import { $not } from './$not';
import { $or } from './$or';

export interface BooleanOperators extends $and, $not, $or {}
