import { Aggregate } from '../aggregate';
import { UnconstrainedAggregateExpression } from '../expressions';
import {
  EvaluateWindowOperatorExpression,
  WindowOperatorExpression
} from '../window-operators';
import { SortSpecification } from './$sort';

export interface SetWindowFieldsStage<T extends object> {
  $setWindowFields: <const S extends SetWindowFieldsSpecification<T>>(
    specification: S
  ) => Aggregate<SetWindowFieldsOutput<T, S>>;
}

export interface SetWindowFieldsSpecification<T extends object> {
  partitionBy?: UnconstrainedAggregateExpression<T>;
  sortBy?: SortSpecification<T>;
  output: Record<string, WindowOperatorExpression<T>>;
}

type SetWindowFieldsOutput<
  T extends object,
  S extends SetWindowFieldsSpecification<T>
> = Omit<T, keyof S['output']> & {
  -readonly [K in keyof S['output']]: EvaluateWindowOperatorExpression<
    T,
    S['output'][K]
  >;
};
