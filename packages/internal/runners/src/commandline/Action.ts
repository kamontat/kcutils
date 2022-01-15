import { Context } from "../contexts";
import { Builder } from "../models/Builder";
import { Transformer } from "../models/Transformer";
import { OptionData } from "./Option";
import { Help } from "./Help";

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

  private helpMessage: string = "";

  private constructor(
    private readonly _option: Transformer<string[], O>,
    private readonly _action: Action<O>
  ) {}

  help(helpMessage: Help | string): this {
    this.helpMessage = helpMessage.toString();
    return this;
  }

  build(): Transformer<O, string[] | Promise<string[]>, string[]> {
    return {
      previous: this._option,
      name: "action",
      transform: async (option, context) => {
        if (option.help) {
          context.log.print(this.helpMessage);
          return [];
        }

        return this._action(option, context);
      },
    };
  }
}
