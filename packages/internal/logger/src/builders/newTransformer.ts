import type { TransformerWithContext } from "../models/Transformer";
import type { Context } from "../models/Context";

const newTransformer = <C1 extends Context, C2 extends Context>(
  fn: TransformerWithContext<unknown, string, C1 & C2>
): TransformerWithContext<unknown, string, C1 & C2> => {
  return fn;
};

export default newTransformer;
