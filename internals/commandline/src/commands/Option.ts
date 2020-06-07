import { TransformFn, InputWrapper } from "../models/common/DataProcess";
import { DataBuilder } from "../models/common/DataBuilder";

export class Option<O = string[]> extends DataBuilder<string[], O> {
  static transform: TransformFn<InputWrapper<string[]>, Promise<string[]>> = ({ data }) => {
    return Promise.resolve(data);
  };
}
