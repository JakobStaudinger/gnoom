declare const STATIC_INPUT_MARKER: unique symbol;

export type StaticInput<T> = T & {
  [STATIC_INPUT_MARKER]: never;
};
