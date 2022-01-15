import { Context } from "../contexts";
import { Starter } from "./Starter";
import { Transformer } from "./Transformer";

export class Chain<I, O> implements Starter<I> {
  static with<I, O>(transformer: Transformer<I, O>): Chain<I, O> {
    return new Chain([transformer]);
  }

  private constructor(
    private readonly _transformers: Transformer<any, any>[]
  ) {}

  with<OO>(data: Transformer<O, OO>): Chain<I, OO> {
    this._transformers.push(data);
    return this as unknown as Chain<I, OO>;
  }

  start(input: I): O {
    const context = Context.build();
    return this._transformers.reduce(async (previous, data) => {
      const p = await previous;
      context.history.setInput(data.name, p);
      const output = await data.transform(p, context);
      context.history.setOutput(data.name, output);

      return output;
    }, input as unknown) as O;
  }
}
