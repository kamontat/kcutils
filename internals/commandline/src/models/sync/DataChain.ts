import { DataProcess, TransformFn, InputWrapper, toInputWrapper } from "../common/DataProcess";
import { Helper } from "../common/Helper";

export class DataChain<I, P, R, H extends string> implements DataProcess<P, R, H> {
  constructor(protected previous: DataProcess<I, P, H>, private transform: TransformFn<InputWrapper<P, H>, R>) {}

  getData(): P {
    return this.previous.build();
  }

  getHelper(): Helper<H> {
    return this.previous.getHelper();
  }

  build(): R {
    return this.transform(toInputWrapper(this));
  }
}
