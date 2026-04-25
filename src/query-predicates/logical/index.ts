import { $not } from './$not';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogicalQueryPredicate<T> extends $not<T> {}
