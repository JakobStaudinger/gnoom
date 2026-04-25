import { $exists } from './$exists';
import { $type } from './$type';

export interface DataTypeQueryPredicate extends $exists, $type {}
