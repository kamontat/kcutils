import parser from "minimist";

/**
 * @public
 * default argument that minimist always returns
 */
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

/**
 * @public
 * command argument context
 */
export class ArgumentContext {
  /**
   * parse command argument (string[]) to json object
   * @param data command argument
   * @param opts option when this parse output
   * @returns minimist object with default argument value
   */
  parse<T>(data: string[], opts?: parser.Opts): T & DefaultArgument {
    return parser(data, opts) as unknown as T & DefaultArgument;
  }
}
