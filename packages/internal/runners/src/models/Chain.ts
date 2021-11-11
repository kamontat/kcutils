import { Context } from "../contexts";
import { Starter } from "./Starter";
import { Transformer } from "./Transformer";

type UnionBuilder<I, O> =
  | {
      type: "constructor";
      fn: TransformerBuilder<I, O>;
    }
  | {
      type: "function";
      fn: FunctionBuilder<I, O>;
    };

type TransformerBuilder<I, O> = new (input: I, context: Context) => Transformer<
  I,
  O
>;

type FunctionBuilder<I, O> = {
  name: string;
  apply: (input: I, context: Context) => O;
};

export class Chain<I, O> implements Starter<I> {
  static with<I, O>(className: TransformerBuilder<I, O>): Chain<I, O> {
    return new Chain([{ type: "constructor", fn: className }]);
  }

  static withFn<I, O>(fn: FunctionBuilder<I, O>): Chain<I, O> {
    return new Chain([{ type: "function", fn }]);
  }

  private constructor(private _classNames: UnionBuilder<any, any>[]) {}

  with<OO>(className: TransformerBuilder<O, OO>): Chain<I, OO> {
    this._classNames.push({ type: "constructor", fn: className });
    return this as unknown as Chain<I, OO>;
  }

  withFn<OO>(fn: FunctionBuilder<O, OO>): Chain<I, OO> {
    this._classNames.push({ type: "function", fn });
    return this as unknown as Chain<I, OO>;
  }

  start(input: I): O {
    const context = Context.build();
    return this._classNames.reduce((previous, data) => {
      if (data.type === "constructor") {
        const transformer = new data.fn(previous, context);

        context.history.setInput(transformer._name, previous);
        const output = transformer.transform();
        context.history.setOutput(transformer._name, output);

        return output;
      } else if (data.type === "function") {
        context.history.setInput(data.fn.name, previous);
        const output = data.fn.apply(previous, context);
        context.history.setOutput(data.fn.name, output);

        return output;
      } else {
        return previous;
      }
    }, input as unknown) as O;
  }
}
