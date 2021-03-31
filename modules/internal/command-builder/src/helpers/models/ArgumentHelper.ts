import parser from "minimist";

import { Helper } from "./Helpers";

const key = "argument";

export class ArgumentHelper implements Helper<typeof key> {
  readonly key = key;
  private parsed: parser.ParsedArgs;

  constructor(private args: string[], opts?: parser.Opts) {
    this.parsed = parser(args, opts);
  }

  getArguments(): string[] {
    return this.args;
  }

  getParsed(): parser.ParsedArgs {
    return this.parsed;
  }
}
