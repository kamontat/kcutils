import { stryker } from "../src";

describe("Stryker config", () => {
  test("initial config object", () => {
    const config = stryker(__dirname);
    expect(config).not.toBeUndefined();
  });

  test("build config object", () => {
    const config = stryker(__dirname).build();

    expect(config).not.toBeUndefined();
    expect(config.logLevel).toEqual("info"); // default log level
    expect(config.timeoutMS).toEqual(60000); // default timeout
  });

  test("override log level to debug is true", () => {
    const config = stryker(__dirname, { debug: true }).build();

    expect(config).not.toBeUndefined();
    expect(config.logLevel).toEqual("debug");
  });

  test("override log level to trace is true", () => {
    const config = stryker(__dirname, { trace: true }).build();

    expect(config).not.toBeUndefined();
    expect(config.logLevel).toEqual("trace");
  });

  test("override timeout to 1", () => {
    const config = stryker(__dirname, { timeout: 1 }).build();

    expect(config).not.toBeUndefined();
    expect(config.timeoutMS).toEqual(1);
  });

  test("override timeout to -100", () => {
    const config = stryker(__dirname, { timeout: -100 }).build();

    expect(config).not.toBeUndefined();
    expect(config.timeoutMS).toEqual(-100); // default log level
  });
});
