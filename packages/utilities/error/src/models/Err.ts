import { replace } from "@kcutils/helper";

class Err extends Error {
  constructor(
    name: string,
    template: string,
    data?: Record<string, string>,
    stack?: string
  ) {
    super(replace(template, data ?? {}));
    this.name = name;
    this.stack = stack;
  }
}

export default Err;
