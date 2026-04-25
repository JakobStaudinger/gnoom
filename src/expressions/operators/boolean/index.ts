import { $and } from './$and';
import { $not } from './$not';
import { $or } from './$or';

export interface BooleanOperatorMap extends $and, $not, $or {}
