import { Context, EnvContext, LogContext } from "../../index";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const doNothing = () => {};

describe("LogContext", () => {
  test("create log context", () => {
    const context = Context.build().log;
    expect(context).toBeDefined();
  });

  test("isDebug is depend on envContext", () => {
    const env = new EnvContext({
      DEBUG: "not-empty",
      CI: "exist",
    });
    const context = new LogContext(env);

    expect(context.isDebug()).toEqual(true);
  });

  test("overrided debug via setDebug()", () => {
    const emptyEnv = new EnvContext({});
    const context = new LogContext(emptyEnv);

    expect(context.isDebug()).toEqual(false);
    context.setDebug(true);
    expect(context.isDebug()).toEqual(true);
    context.setDebug(false);
    expect(context.isDebug()).toEqual(false);
  });

  test.each([
    ["test1", undefined, "test1"],
    ["test2", null, "test2"],
    ["test3", "", "test3"],
    ["test", "second times", "test: second times"],
    [
      "test",
      { test: true, num: 3, str: "example" },
      "test: { test: true, num: 3, str: 'example' }",
    ],
  ])("print('%s', '%s') should output '%s'", (a, b, c) => {
    const mockConsole = jest
      .spyOn(console, "log")
      .mockImplementation(doNothing);
    mockConsole.mockReset();

    const emptyEnv = new EnvContext({});
    const context = new LogContext(emptyEnv);

    context.print(a, b);
    expect(mockConsole).toBeCalledWith(c);

    mockConsole.mockReset();
    mockConsole.mockRestore();
  });

  test.each([
    [false, false],
    [true, true],
  ])("print=%s on debug() if debug_mode is %s (env mode)", (a, b) => {
    const mockConsole = jest
      .spyOn(console, "log")
      .mockImplementation(doNothing);
    mockConsole.mockReset();

    const env: Record<string, string> = {};
    if (b) env["DEBUG"] = "true";

    const envContext = new EnvContext(env);
    const context = new LogContext(envContext);

    context.debug("example message");
    expect(mockConsole).toBeCalledTimes(a ? 1 : 0);

    mockConsole.mockRestore();
  });

  test.each([
    [false, false],
    [true, true],
  ])("print=%s on debug() if debug_mode is %s (overrided mode)", (a, b) => {
    const mockConsole = jest
      .spyOn(console, "log")
      .mockImplementation(doNothing);
    mockConsole.mockReset();

    const envContext = new EnvContext({});
    const context = new LogContext(envContext);

    context.setDebug(b);
    context.debug("example message");
    expect(mockConsole).toBeCalledTimes(a ? 1 : 0);

    mockConsole.mockRestore();
  });
});
