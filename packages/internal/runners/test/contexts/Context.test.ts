import { Context } from "../..";

describe("Context", () => {
  test("build always return new object", () => {
    const a = Context.build();
    const b = Context.build();

    a.history.setInput("12", "value");
    b.history.setInput("13", "value");
    expect(a.history.getInput("12")).not.toEqual(b.history.getInput("12"));
    expect(a.history.getInput("13")).not.toEqual(b.history.getInput("13"));
  });

  test("get always return same object", () => {
    const a = Context.get();
    const b = Context.get();

    a.history.setInput("12", "value");
    b.history.setInput("13", "value");
    expect(a.history.getInput("12")).toEqual(b.history.getInput("12"));
    expect(a.history.getInput("13")).toEqual(b.history.getInput("13"));
  });
});
