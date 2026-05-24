import { $elemMatch } from './$elemMatch';
import { $all } from './$all';
import { $size } from './$size';

export interface ArrayOperators<T> extends $all<T>, $elemMatch<T>, $size {}
