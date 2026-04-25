import { StaticInput } from '../expressions/static-input';

export interface $minN {
  $minN: <V extends number>(input: StaticInput<{ input: V; n: number }>) => V[];
}
