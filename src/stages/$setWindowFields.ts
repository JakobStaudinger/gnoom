import { Aggregate } from '../aggregate';
import { AggregateExpression } from '../expressions';
import { Merge } from '../types/merge';
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
  partitionBy?: AggregateExpression<T>;
  sortBy?: SortSpecification<T>;
  output: Record<string, WindowOperatorExpression<T>>;
}

type SetWindowFieldsOutput<
  T extends object,
  S extends SetWindowFieldsSpecification<T>
> = Merge<
  T,
  {
    -readonly [K in keyof S['output']]: EvaluateWindowOperatorExpression<
      T,
      S['output'][K]
    >;
  }
>;
