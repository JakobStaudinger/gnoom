import { StaticInput } from '../static-input';

export interface TextOperatorMap {
  $meta:
    | ((keyword: StaticInput<'textScore'>) => number)
    | ((keyword: StaticInput<'indexKey'>) => object | undefined);
}
