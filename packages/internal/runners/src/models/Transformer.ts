import { Context } from "../contexts";

export type Transformer<I, O, P = unknown> = {
  previous?: Transformer<P, I>;
  name: string;
  transform: (input: I, context: Context) => O;
};
