import { DataProcess, InputWrapper, TransformFn } from "./DataProcess";

export class Data<I, R> implements DataProcess<I, R> {
  constructor(private input: InputWrapper<I>, private transform: TransformFn<InputWrapper<I>, R>) {}

  getData() {
    return this.input.data;
  }

  getHelper() {
    return this.input.helper;
  }

  build() {
    return this.transform(this.input);
  }
}
