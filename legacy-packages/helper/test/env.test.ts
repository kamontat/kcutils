import { env } from "../src";

const setCI = (str: string | undefined) => {
  const old = process.env.CI;
  process.env.CI = str;
  return old;
};

const _setEnv = (str: string | undefined) => {
  const old = process.env.ENV;
  process.env.ENV = str;
  return old;
};

describe("Environment Helper", () => {
  test("check undefined env", () => {
    const old = _setEnv(undefined);

    expect(env.isDevelopment()).toBeTruthy();
    expect(env.isStaging()).toBeFalsy();
    expect(env.isProduction()).toBeFalsy();
    expect(env.isTesting()).toBeFalsy();

    _setEnv(old);
  });

  test("check development", () => {
    const old = _setEnv("development");

    expect(env.isDevelopment()).toBeTruthy();
    expect(env.isStaging()).toBeFalsy();

    _setEnv(old);
  });

  test("check staging", () => {
    const old = _setEnv("staging");

    expect(env.isStaging()).toBeTruthy();
    expect(env.isProduction()).toBeFalsy();

    _setEnv(old);
  });

  test("check development", () => {
    const old = _setEnv("prod");

    expect(env.isProduction()).toBeTruthy();
    expect(env.isTesting()).toBeFalsy();

    _setEnv(old);
  });

  test("check dev", () => {
    const old = _setEnv("dev");

    expect(env.isDevelopment()).toBeTruthy();
    expect(env.isStaging()).toBeFalsy();

    _setEnv(old);
  });

  test("check d", () => {
    const old = _setEnv("d");

    expect(env.isDevelopment()).toBeTruthy();
    expect(env.isStaging()).toBeFalsy();

    _setEnv(old);
  });

  test("check when on ci", () => {
    const old = setCI("true");

    expect(env.isCI()).toBeTruthy();

    setCI(old);
  });

  test("check when not on ci", () => {
    const old = setCI("false");

    expect(env.isCI()).toBeFalsy();

    setCI(old);
  });

  test("check when unknown", () => {
    const old = setCI(undefined);

    expect(env.isCI()).toBeFalsy();

    setCI(old);
  });

  test("read unknown variable in environment", () => {
    expect(env.read("UNKNOWN", "default")).toEqual("default");
  });

  test("read exist variable in environment", () => {
    const envName = "HELLO_WORLD";

    const old = env.setEnv(envName, "testing");
    expect(env.read(envName, "default")).toEqual("testing");

    env.setEnv(envName, old);
  });

  test("can set environment value", () => {
    process.env.SOMETHING_NOT_RELATE = "this";
    expect(process.env.SOMETHING_NOT_RELATE).toEqual("this");

    env.setEnv("SOMETHING_NOT_RELATE", "that");
    expect(process.env.SOMETHING_NOT_RELATE).toEqual("that");
  });

  test("return old environment value", () => {
    // process.env.I_DID_NOT_THINK = "this";
    expect(process.env.I_DID_NOT_THINK).toEqual(undefined);

    const old = env.setEnv("I_DID_NOT_THINK", "new");

    expect(old).toEqual(undefined);
    expect(process.env.I_DID_NOT_THINK).toEqual("new");
  });
});
