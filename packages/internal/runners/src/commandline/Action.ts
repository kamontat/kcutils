import { Context } from "../contexts";
import { Builder } from "../models/Builder";
import { Transformer } from "../models/Transformer";
import { OptionData } from "./Option";

export type Action<O> = (
  option: O,
  context: Context
) => string[] | Promise<string[]>;

export class ActionBuilder<O extends OptionData>
  implements Builder<Transformer<O, string[] | Promise<string[]>, string[]>>
{
  static initial<O extends OptionData>(
    option: Transformer<string[], O>,
    fn: Action<O>
  ): ActionBuilder<O> {
    return new ActionBuilder(option, fn);
  }

  private constructor(
    private readonly _option: Transformer<string[], O>,
    private readonly _action: Action<O>
  ) {}

  build(): Transformer<O, string[] | Promise<string[]>, string[]> {
    return {
      previous: this._option,
      name: "action",
      transform: this._action,
    };
  }
}
