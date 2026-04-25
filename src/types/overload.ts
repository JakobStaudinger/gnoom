export interface OverloadTransformation {
  output: unknown;
  T: unknown;
}

export type Overload<T, Fn extends OverloadTransformation> =
  | OverloadBoolean<T, Fn>
  | (T extends infer U
      ? U extends boolean
        ? never
        : U extends unknown
          ? ApplyTransformation<U, Fn>
          : never
      : never);

type OverloadBoolean<T, Fn extends OverloadTransformation> = boolean extends T
  ? ApplyTransformation<boolean, Fn>
  : never;

type ApplyTransformation<T, Fn extends OverloadTransformation> = (Fn & {
  T: T;
})['output'];
