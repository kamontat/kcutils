import { DataProcess, InputWrapper, TransformFn } from "./DataProcess";
import { Helper } from "./Helper";

export class Data<I, R, H extends string> implements DataProcess<I, R, H> {
  constructor(private input: InputWrapper<I, H>, private transform: TransformFn<InputWrapper<I, H>, R>) {}

  getData(): I {
    return this.input.data;
  }

  getHelper(): Helper<H> {
    return this.input.helper;
  }

  build(): R {
    return this.transform(this.input);
  }
}
