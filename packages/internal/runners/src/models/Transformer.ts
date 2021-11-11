import { Context } from "../contexts";

export type ProcessorOption<V> = {
  input: V;
};

export abstract class Transformer<I, O> {
  abstract readonly _name: string;
  protected readonly _input: I;
  protected readonly _context: Context;

  constructor(input: I, context: Context) {
    this._input = input;
    this._context = context;
  }

  abstract transform(): O;
}
