import {
  initial,
  build,
  log,
  newContext,
  newSettings,
  newActions,
  newData,
} from "../index";

const context = newContext({
  ENV: "from context",
  build: (str: string) => "build " + str,
});

const settings = newSettings({
  levels: {
    a: newData({
      data: "a",
    }),
    b: newData({
      data: "b",
    }),
  },
  types: {
    z: newData({
      data: "n",
    }),
    x: newData({
      data: "b",
    }),
  },
});

describe("Logger interface", () => {
  it("build output log message", () => {
    const actions = newActions(context, settings, {
      context: (input) => {
        return {
          getType: (t: keyof typeof input.settings.types) =>
            input.settings.types[t].transform(input.settings.types[t]),
          getLevel: (t: keyof typeof input.settings.levels) =>
            input.settings.levels[t].transform(input.settings.levels[t]),
        };
      },
      transformers: {
        all: (i) => i.message.value as string,
        context: (_, context) => context.build(context.ENV),
      },
      outputs: {
        console: console.log.bind(console),
      },
    });

    const executor = initial(context, settings, actions, {
      level: "a",
      type: "z",
      output: "console",
      transform: "all",
    });

    expect(
      build(executor, {
        value: "string",
        transform: "context",
      })
    ).toEqual("build from context");
  });

  it("print output log message", () => {
    const mockFn = jest.fn();
    const actions = newActions(context, settings, {
      transformers: {
        message: (i) => i.message.value as string,
      },
      outputs: {
        test: mockFn,
      },
    });

    const executor = initial(context, settings, actions, {
      level: "a",
      type: "z",
      output: "test",
      transform: "message",
    });

    log(executor, {
      value: "string",
      transform: "message",
      output: "test",
    });
    expect(mockFn).toHaveBeenCalledWith("string");
  });
});
