import { $elemMatch } from './$elemMatch';
import { $all } from './$all';
import { $size } from './$size';

export interface ArrayQueryPredicate<T> extends $elemMatch<T>, $all<T>, $size {}
