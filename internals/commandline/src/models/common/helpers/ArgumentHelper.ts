import parser from "minimist";

export class ArgumentHelper {
  parse(data: string[], opts?: parser.Opts) {
    return parser(data, opts);
  }
}
