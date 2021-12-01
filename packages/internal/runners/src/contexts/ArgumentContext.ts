import parser from "minimist";

// value from minimist argument object
export type DefaultArgument = {
  /**
   * If opts['--'] is true, populated with everything after the --
   */
  "--"?: string[] | undefined;

  /**
   * Contains all the arguments that didn't have an option associated with them
   */
  _: string[];
};

export class ArgumentContext {
  parse<T>(data: string[], opts?: parser.Opts): T & DefaultArgument {
    return parser(data, opts) as unknown as T & DefaultArgument;
  }
}
