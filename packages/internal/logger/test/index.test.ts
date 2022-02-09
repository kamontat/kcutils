import {
  initial,
  build,
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
  describe("Context", () => {
    test("call context in transformer", () => {
      const actions = newActions(context, settings, {
        transformers: {
          all: (i) => JSON.stringify(i),
          context: (_, context) => context.ENV,
        },
        outputs: {
          console: console.log.bind(console),
          debug: console.debug.bind(console),
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
      ).toEqual("from context");
    });
  });
});
