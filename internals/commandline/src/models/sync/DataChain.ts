import { DataProcess, TransformFn, InputWrapper, toInputWrapper } from "../common/DataProcess";

export class DataChain<I, P, R> implements DataProcess<P, R> {
  constructor(private data: DataProcess<I, P>, private transform: TransformFn<InputWrapper<P>, R>) {}

  getData() {
    return this.data.build();
  }

  getHelper() {
    return this.data.getHelper();
  }

  build(): R {
    return this.transform(toInputWrapper(this));
  }
}
