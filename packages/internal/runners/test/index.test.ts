import { Commandline, Option, OptionBuilder, Chain, ActionBuilder } from "..";

describe("test", () => {
  test("example #1", () => {
    console.log(
      Chain.with<string[], number>({
        name: "option",
        transform: (data) => {
          return data.length;
        },
      })
        .with({
          name: "action",
          transform: (data) => {
            return data.toFixed(2);
          },
        })
        .with({
          name: "test",
          transform: (data, context) => {
            return data === context.history.getOutput<string>("action");
          },
        })
        .start(["1", "2"])
    );
  });

  test("example #2", () => {
    const option = OptionBuilder.build({
      test: {
        defaultValue: false,
        fn: Option.toBoolean,
      },
      hello: {
        defaultValue: 0,
        fn: Option.toInt,
      },
    }).build();

    const action = ActionBuilder.build(option, (_option, _context) => {
      const base = "yarn";
      const args = [base];
      args.push(..._option.raw);

      return args;
    }).build();

    Commandline.build(action).start(["test", "--dry"]);
  });
});
