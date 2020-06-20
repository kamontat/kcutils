import { DataProcess, TransformFn, InputWrapper } from "../common/DataProcess";

export class DataChain<I, P, R> implements DataProcess<Promise<P>, Promise<R>> {
  constructor(
    protected previous: DataProcess<I | Promise<I>, Promise<P>>,
    private transform: TransformFn<InputWrapper<P>, Promise<R>>
  ) {}

  getData() {
    return this.previous.build();
  }

  getHelper() {
    return this.previous.getHelper();
  }

  async build(): Promise<R> {
    const data = await this.getData();
    const helper = this.getHelper();

    return this.transform({ data, helper });
  }
}
