import { Context } from "../../index";

describe("Context", () => {
  test("build always return new object", () => {
    const a = Context.build();
    const b = Context.build();

    // should not be same object
    expect(a).not.toBe(b);
  });

  test("get always return same object", () => {
    const a = Context.get();
    const b = Context.get();

    expect(a).toBe(b);
  });
});
