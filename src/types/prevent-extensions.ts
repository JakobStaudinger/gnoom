export type PreventExtensions<S, Base> = {
  [K in keyof S]: K extends keyof Base ? S[K] : never;
};
