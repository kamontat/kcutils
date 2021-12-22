import {
  Commandline,
  Option,
  OptionBuilder,
  Chain,
  ActionBuilder,
  OptionData,
  Context,
  Execution,
} from "..";

describe("chain command", () => {
  test("normal chainable command", () => {
    const result = Chain.with<string[], number>({
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
      .start(["1", "2"]);

    expect(result).toBe(true);
  });
});

describe("commandline", () => {
  const mockExecution: Execution<string> = (
    _context: Context,
    _command: string,
    args: string[]
  ) => {
    return args.join(" ");
  };

  test("commandline without option should failed", () => {
    expect(() => {
      Commandline.initial({
        name: "test",
        transform: () => {
          return [];
        },
      }).start(["test", "--dry"]);
    }).toThrow();
  });

  test.only("normal commandline with option and action", () => {
    const option = OptionBuilder.initial({
      test: {
        defaultValue: false,
        fn: Option.toBoolean,
      },
      hello: {
        defaultValue: 0,
        fn: Option.toInt,
      },
    }).build();

    const action = ActionBuilder.initial(option, (_option, _context) => {
      const base = "yarn";
      const args = [base];
      args.push(..._option.raw);

      expect(_option.debug).toEqual(false);
      expect(_option.dryrun).toEqual(true);
      expect(_option.raw).toEqual(["test"]);

      return args;
    }).build();

    Commandline.initial(action).start(["test", "--dry"]);
  });

  test("commandline default option if option is undefined", () => {
    Commandline.initial(
      {
        name: "test",
        transform: () => {
          return [];
        },
        previous: {
          name: "option",
          transform: () => {
            return undefined as unknown as OptionData;
          },
        },
      },
      mockExecution
    ).start(["test", "--dry"]);
  });
});
