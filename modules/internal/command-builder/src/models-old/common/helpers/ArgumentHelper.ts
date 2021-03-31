import parser from "minimist";
import { Helper } from "../Helper";

class ArgumentHelper implements Helper<"argument"> {
  readonly key = "argument";
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

export default ArgumentHelper;
