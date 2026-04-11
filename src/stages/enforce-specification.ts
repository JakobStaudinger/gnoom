// Disallows "extending" `MatchSpecification` by adding keys that don't exist in the original type.
export type EnforceSpecification<S, BaseSpecification> = {
  [K in keyof S]: K extends keyof BaseSpecification ? S[K] : never;
};
