import type { Transformer } from "../models/Transformer";
import type { ActionParameters } from "../models/Actions";
import type { Context } from "../models/Context";

const buildContext = <
  C1 extends Context,
  L extends string,
  T extends string,
  TF extends string,
  O extends string,
  C2 extends Context
>(
  context: C1,
  input: ActionParameters<L, T, TF, O>,
  builder?: Transformer<ActionParameters<L, T, TF, O>, C2>
): C1 & C2 => {
  if (!builder) return context as C1 & C2;
  return Object.assign(builder(input), context);
};

export default buildContext;
