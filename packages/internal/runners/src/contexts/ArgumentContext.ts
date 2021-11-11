import parser from "minimist";

export class ArgumentContext {
  parse(data: string[], opts?: parser.Opts): parser.ParsedArgs {
    return parser(data, opts);
  }
}
