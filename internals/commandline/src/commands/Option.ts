import { TransformFn, InputWrapper } from "../models/common/DataProcess";
import { DataBuilder, DataBuilderHelperString } from "../models/common/DataBuilder";
import minimist from "minimist";
import { Helper } from "../models/common/Helper";
import { CommandlineOption } from "./Commandline";

export class Option<O = string[]> extends DataBuilder<string[], O> {
  static transform: TransformFn<InputWrapper<string[], DataBuilderHelperString>, Promise<CommandlineOption>> = ({
    data,
    helper,
  }) => {
    const args = helper.argument.parse(data, { alias: { dryrun: ["dry", "dryrun", "dry-run", "d"] }, "--": true });
    const dryrun = args.dry || args.dryrun || args["dry-run"] || args._.includes("dry");

    return Promise.resolve({ dryrun: dryrun, arguments: args, raw: data });
  };

  static transformV2: TransformFn<InputWrapper<string[], DataBuilderHelperString>, OptionTransformerBuilder> = ({
    data,
    helper,
  }) => {
    return OptionTransformerBuilder.start(helper, data);
  };
}

type FullOptionObject<T> = {
  raw: string[];
  result: T;
  arguments: minimist.ParsedArgs;
};

export class OptionTransformerBuilder {
  static start(
    helper: Helper<DataBuilderHelperString>,
    args: string[],
    opts?: minimist.Opts
  ): OptionTransformerBuilder {
    const parsed = helper.argument.parse(args, opts);
    const builder = new OptionTransformerBuilder(args, parsed);
    return builder
      .newArguments<string>("dryrun", ["dry", "dry-run", "dr"], "false", t => t !== "false")
      .newArgument("arguments", parsed)
      .newArgument("raw", args);
  }

  private result: Record<string, any>;

  private constructor(private args: string[], private parsed: minimist.ParsedArgs) {
    this.result = {};
  }

  newArgument<T>(key: string, def: T, parser?: (t: T) => any): this {
    return this.newArguments(key, [], def, parser);
  }

  newArguments<T>(key: string, alias: string[], def: T, parser?: (t: T) => any): this {
    let saved = false;
    let result = undefined;

    const a = this.parsed[key];
    if (a !== undefined || a !== null || a !== "") {
      result = a;
      saved = true;
    } else {
      for (const k of alias) {
        const p = this.parsed[k];
        if (p !== undefined || p !== null || p !== "") {
          result = p;
          saved = true;
        }
      }
    }

    if (!saved) result = def;

    this.result[key] = parser ? parser(result) : result;
    return this;
  }

  get<T extends Record<string, any>>(): Promise<T> {
    return Promise.resolve(this.result as T);
  }

  getMerge<T extends Record<string, any>>(): Promise<T & minimist.ParsedArgs> {
    return Promise.resolve(Object.assign({}, this.parsed, this.result as T));
  }

  getFull<T extends Record<string, any>>(): Promise<FullOptionObject<T>> {
    return Promise.resolve({
      raw: this.args,
      result: this.result as T,
      arguments: this.parsed,
    });
  }
}
