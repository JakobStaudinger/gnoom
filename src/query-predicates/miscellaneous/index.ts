import { $mod } from './$mod';
import { $regex } from './$regex';

export interface MiscellaneousQueryPredicate<T> extends $mod<T>, $regex {}
