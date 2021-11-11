import { Chain } from "../src/models/Chain";
import { Transformer } from "../src/models/Transformer";

class Option extends Transformer<string[], Record<string, string>> {
  readonly _name: string = "option";

  transform(): Record<string, string> {
    return {
      value: this._input[0],
      next: "true",
      context: this._context.general.getOrElse(this._input[10], "unknown"),
    };
  }
}

class Action extends Transformer<Record<string, string>, number> {
  readonly _name: string = "action";

  transform(): number {
    return Object.keys(this._input).length;
  }
}

class Commandline extends Transformer<number, boolean> {
  readonly _name: string = "commandline";

  transform(): boolean {
    const argument = this._context.history.getInput("option");
    console.log(argument);
    return this._input === 3;
  }
}

describe("test", () => {
  test("example", () => {
    console.log(
      Chain.with(Option)
        .with(Action)
        .with(Commandline)
        .withFn({
          name: "custom",
          apply: (input, context) => {
            return context.history.getOutput<number>("test");
          },
        })
        .start(process.argv)
    );
  });
});
