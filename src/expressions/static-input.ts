const STATIC_INPUT_MARKER = Symbol('StaticInput');

export type StaticInput<T> = T & {
  [STATIC_INPUT_MARKER]: never;
};
