import type { Actions } from "../models/Actions";
import type { Settings } from "../models/Settings";
import type { Context } from "../models/Context";

const newActions = <
  C1 extends Context,
  L extends string,
  T extends string,
  TF extends string,
  O extends string,
  C2 extends Context
>(
  // static context
  _context: C1,
  _setting: Settings<L, T>,
  obj: Actions<C1, L, T, TF, O, C2>
): Actions<C1, L, T, TF, O, C2> => {
  return obj;
};

export default newActions;
