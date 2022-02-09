import type { Context } from "./Context";

export type Transformer<I, R> = (input: I) => R;

export type TransformerWithContext<I, R, C extends Context> = (
  input: I,
  context: C
) => R;
