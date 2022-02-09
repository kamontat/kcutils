import type { Context } from "../models/Context";

const newContext = <C extends Context>(context: C): C => {
  return context;
};

export default newContext;
