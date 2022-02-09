import type { Executors } from "../models/Executors";
import type { Context } from "../models/Context";

const initial = <
  C1 extends Context,
  L extends string,
  T extends string,
  TF extends string,
  O extends string,
  C2 extends Context
>(
  context: Executors<C1, L, T, TF, O, C2>["context"],
  settings: Executors<C1, L, T, TF, O, C2>["settings"],
  actions: Executors<C1, L, T, TF, O, C2>["actions"],
  defaults: Executors<C1, L, T, TF, O, C2>["defaults"]
): Executors<C1, L, T, TF, O, C2> => {
  return {
    context,
    settings,
    actions,
    defaults,
  };
};

export default initial;
