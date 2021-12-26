import { Context } from "../..";

describe("HistoryContext", () => {
  test("create history context", () => {
    const context = Context.build().history;
    expect(context).toBeDefined();
  });

  test("get unknown key input will return undefined", () => {
    const context = Context.build().history;
    expect(context.getInput("unknown")).toEqual(undefined);
  });

  test("get unknown key input with default will return default", () => {
    const context = Context.build().history;
    expect(context.getInputOrElse("unknown", true)).toEqual(true);
  });

  test("get known key input will return value", () => {
    const context = Context.build().history;

    context.setInput("known", 123);
    expect(context.getInput("known")).toEqual(123);
  });

  test("get known key input with default will return value", () => {
    const context = Context.build().history;

    context.setInput("known", "test");
    expect(context.getInputOrElse("known", 0)).toEqual("test");
  });

  test("get unknown key output will return undefined", () => {
    const context = Context.build().history;
    expect(context.getOutput("unknown")).toEqual(undefined);
  });

  test("get unknown key output with default will return default", () => {
    const context = Context.build().history;
    expect(context.getOutputOrElse("unknown", ["a", "b", "c"])).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  test("get known key output will return value", () => {
    const context = Context.build().history;

    context.setOutput("known", 123);
    expect(context.getOutput("known")).toEqual(123);
  });

  test("get known key output with default will return value", () => {
    const context = Context.build().history;

    context.setOutput("known", 123);
    expect(context.getOutputOrElse("known", 0)).toEqual(123);
  });
});
