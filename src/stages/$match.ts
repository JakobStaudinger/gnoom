type MatchExpression<V> = V;

type MatchSpecification<T extends object> = Partial<{
  [K in keyof T]: MatchExpression<T[K]>;
}>;

export type MatchStage<T extends object> = {
  specification: MatchSpecification<T>;
  output: T;
};
