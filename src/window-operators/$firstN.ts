import { StaticInput } from '../expressions/static-input';

export interface $firstN {
  $firstN: <V>(input: StaticInput<{ input: V; n: number }>) => V[];
}
