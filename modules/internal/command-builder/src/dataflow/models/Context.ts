import { Helpers } from "../../helpers";

interface ContextInterface<IN, D, H extends Helpers> {
  readonly input: IN;
  readonly data: D;
  readonly helper: H;
}

type Fn<I, O> = (i: I) => O;

export class Context<IN, D, H extends Helpers>
  implements ContextInterface<IN, D, H> {
  constructor(readonly input: IN, readonly data: D, readonly helper: H) {}

  copy<DD>(data: DD): Context<IN, DD, H> {
    return new Context(this.input, data, this.helper);
  }

  copyFn<DD>(fn: Fn<D, DD>): Context<IN, DD, H> {
    return new Context(this.input, fn(this.data), this.helper);
  }
}
