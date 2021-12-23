import { Context } from "@kcinternal/runners";

describe("test", () => {
  test("example #1", () => {
    expect(1 + 1).toBe(2);
  });

  test("example #2", () => {
    expect(Context.build()).toBeDefined();
  });
});
