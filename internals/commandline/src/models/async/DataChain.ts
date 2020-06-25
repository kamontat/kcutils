import { DataProcess, TransformFn, InputWrapper } from "../common/DataProcess";
import { Helper } from "../common/Helper";

export class DataChain<I, P, R, H extends string> implements DataProcess<Promise<P>, Promise<R>, H> {
  constructor(
    protected previous: DataProcess<I | Promise<I>, Promise<P>, H>,
    private transform: TransformFn<InputWrapper<P, H>, Promise<R>>
  ) {}

  getData(): Promise<P> {
    return this.previous.build();
  }

  getHelper(): Helper<H> {
    return this.previous.getHelper();
  }

  async build(): Promise<R> {
    const data = await this.getData();
    const helper = this.getHelper();

    return this.transform({ data, helper });
  }
}
