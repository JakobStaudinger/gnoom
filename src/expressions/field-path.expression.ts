type FieldPathExpressionHelper<T extends object> = {
  [K in keyof T & string]: T[K] extends object
    ? `${K}.${FieldPathExpressionHelper<T[K]>}` | K
    : K;
}[keyof T & string];

type EvaluateFieldPathExpression<
  T extends object,
  Path
> = Path extends `${infer Head extends keyof T & string}.${infer Tail}`
  ? T[Head] extends object
    ? EvaluateFieldPathExpression<T[Head], Tail>
    : T[Head]
  : Path extends keyof T & string
    ? T[Path]
    : never;

export type FieldPathExpression<T extends object, EvaluateTo> =
  FieldPathExpressionHelper<T> extends infer Path extends string
    ? {
        [K in Path]: EvaluateFieldPathExpression<T, K> extends EvaluateTo
          ? `$${K}`
          : never;
      }[Path]
    : never;
