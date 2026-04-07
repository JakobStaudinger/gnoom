export type CustomAggregationExpression =
  | { $accumulator: (use: never) => unknown }
  | { $function: (use: never) => unknown };
