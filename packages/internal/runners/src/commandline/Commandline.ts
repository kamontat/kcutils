import { Chain } from "../models/Chain";
import { Starter } from "../models/Starter";
import { Transformer } from "../models/Transformer";
import { OptionData } from "./Option";
import { Execution, defaultExecution } from "./Execution";

export class Commandline<O extends OptionData, T> implements Starter<string[]> {
  static initial<O extends OptionData, T>(
    action: Transformer<O, string[] | Promise<string[]>, string[]>,
    execution?: Execution<T>
  ): Commandline<O, T> {
    if (!action.previous) {
      throw new Error("cannot found option parser");
    }

    return new Commandline<O, any>(
      action.previous,
      action,
      execution ?? defaultExecution
    );
  }

  private constructor(
    private readonly _option: Transformer<string[], O>,
    private readonly _action: Transformer<O, string[] | Promise<string[]>>,
    private readonly _execution: Execution<T>
  ) {}

  start(input: string[]): Promise<T> {
    return Chain.with(this._option)
      .with(this._action)
      .with({
        name: "commandline",
        transform: async (_commands, context) => {
          const commands = await _commands;
          const options = context.history.getOutput<O>("option");
          const command = context.general.getOrElse(commands.shift(), "echo");
          if (options?.debug) {
            context.log.setDebug(true);
          }

          context.log.debug("command", `${command} ${commands.join(" ")}`);

          if (options?.dryrun) {
            return this._execution(context, "exit", ["0"]);
          } else {
            return this._execution(context, command, commands);
          }
        },
      })
      .start(input);
  }
}
