import { StaticInput } from '../../static-input';

export interface $meta {
  $meta:
    | ((keyword: StaticInput<'textScore'>) => number)
    | ((keyword: StaticInput<'indexKey'>) => object | undefined);
}
