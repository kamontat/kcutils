import { Context } from "../../index";

describe("ArgumentContext", () => {
  test("create argument context", () => {
    const context = Context.build().argument;
    expect(context).toBeDefined();
  });

  test("parse context via parse() method", () => {
    const context = Context.build().argument;
    expect(context.parse<{ hello: boolean }>(["--hello"]).hello).toBe(true);
  });
});
