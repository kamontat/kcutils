import { newContext } from "../../index";

describe("New Context", () => {
  test("empty context", () => {
    const context = newContext({});
    expect(context).toEqual({});
  });

  test("constant context", () => {
    const context = newContext({
      test: true,
    });
    expect(context.test).toEqual(true);
  });

  test("function context", () => {
    const context = newContext({
      greet: () => "hello world",
    });
    expect(context.greet()).toEqual("hello world");
  });
});
