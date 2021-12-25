import { Context } from "../..";

describe("CommandContext", () => {
  test("create command context", () => {
    const context = Context.build().command;
    expect(context).toBeDefined();
  });

  test("return node command correctly", () => {
    const context = Context.build().command;
    expect(context.node("test")).toEqual(["node", "test"]);
  });
});
