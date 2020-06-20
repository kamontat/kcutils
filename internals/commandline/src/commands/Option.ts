import { TransformFn, InputWrapper } from "../models/common/DataProcess";
import { DataBuilder } from "../models/common/DataBuilder";
import { CommandlineOption } from "./Commandline";

export class Option<O = string[]> extends DataBuilder<string[], O> {
  static transform: TransformFn<InputWrapper<string[]>, Promise<CommandlineOption>> = ({ data }) => {
    return Promise.resolve({ dryrun: false, arguments: data });
  };
}
