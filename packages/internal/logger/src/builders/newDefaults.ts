import type { DefaultParameter } from "../models/Parameters";

const newDefaults = <
  L extends string,
  T extends string,
  TF extends string,
  O extends string
>(
  defaults: DefaultParameter<L, T, TF, O>["defaults"]
): DefaultParameter<L, T, TF, O>["defaults"] => {
  return defaults;
};

export default newDefaults;
