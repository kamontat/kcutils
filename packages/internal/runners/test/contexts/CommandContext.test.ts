import { Context } from "../../index";

describe("CommandContext", () => {
  const context = Context.build().command;
  test("create command context", () => {
    expect(context).toBeDefined();
  });

  test("return node command correctly", () => {
    expect(context.node("test")).toEqual(["node", "test"]);
  });

  test("return tsc command correctly", () => {
    expect(context.tsc("/tmp/tsconfig.json", "test")).toEqual([
      "tsc",
      "--project",
      "/tmp/tsconfig.json",
      "test",
    ]);
  });

  test("return rollup command correctly", () => {
    expect(context.rollup("test")).toEqual(["rollup", "--config", "test"]);
  });

  test("return eslint command correctly", () => {
    expect(context.eslint("/tmp/.eslintrc.json", "test")).toEqual([
      "eslint",
      "--config",
      "/tmp/.eslintrc.json",
      "test",
    ]);
  });

  test("return jest command correctly", () => {
    expect(context.jest("/tmp/jest.config.ts", "test")).toEqual([
      "jest",
      "--config",
      "/tmp/jest.config.ts",
      "test",
    ]);
  });

  test("return stryker command correctly", () => {
    expect(context.stryker("/tmp/stryker.conf.js", "--test")).toEqual([
      "stryker",
      "--test",
      "run",
      "/tmp/stryker.conf.js",
    ]);
  });
});
