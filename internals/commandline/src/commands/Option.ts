import { TransformFn, InputWrapper } from "../models/common/DataProcess";
import { DataBuilder, DataBuilderHelperString } from "../models/common/DataBuilder";
import { CommandlineOption } from "./Commandline";

export class Option<O = string[]> extends DataBuilder<string[], O> {
  static transform: TransformFn<InputWrapper<string[], DataBuilderHelperString>, Promise<CommandlineOption>> = ({
    data,
    helper,
  }) => {
    const args = helper.argument.parse(data, { alias: { dryrun: ["dry", "dryrun", "dry-run", "d"] } });
    const dryrun = args.dry || args.dryrun || args["dry-run"] || args._.includes("dry");

    return Promise.resolve({ dryrun: dryrun, arguments: args, raw: data });
  };
}
