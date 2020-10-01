import parser from "minimist";

export class ArgumentHelper {
  parse(data: string[], opts?: parser.Opts): parser.ParsedArgs {
    return parser(data, opts);
  }
}
