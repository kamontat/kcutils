import {
  read,
  write,
  isCI,
  isDevelopment,
  isStaging,
  isProduction,
  isTesting,
} from "../src/env";

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

    expect(isDevelopment()).toBeTruthy();
    expect(isStaging()).toBeFalsy();
    expect(isProduction()).toBeFalsy();
    expect(isTesting()).toBeFalsy();

    _setEnv(old);
  });

  test("check development", () => {
    const old = _setEnv("development");

    expect(isDevelopment()).toBeTruthy();
    expect(isStaging()).toBeFalsy();

    _setEnv(old);
  });

  test("check staging", () => {
    const old = _setEnv("staging");

    expect(isStaging()).toBeTruthy();
    expect(isProduction()).toBeFalsy();

    _setEnv(old);
  });

  test("check development", () => {
    const old = _setEnv("prod");

    expect(isProduction()).toBeTruthy();
    expect(isTesting()).toBeFalsy();

    _setEnv(old);
  });

  test("check dev", () => {
    const old = _setEnv("dev");

    expect(isDevelopment()).toBeTruthy();
    expect(isStaging()).toBeFalsy();

    _setEnv(old);
  });

  test("check d", () => {
    const old = _setEnv("d");

    expect(isDevelopment()).toBeTruthy();
    expect(isStaging()).toBeFalsy();

    _setEnv(old);
  });

  test("check when on ci", () => {
    const old = setCI("true");

    expect(isCI()).toBeTruthy();

    setCI(old);
  });

  test("check when not on ci", () => {
    const old = setCI("false");

    expect(isCI()).toBeFalsy();

    setCI(old);
  });

  test("check when unknown", () => {
    const old = setCI(undefined);

    expect(isCI()).toBeFalsy();

    setCI(old);
  });

  test("read unknown variable in environment", () => {
    expect(read("UNKNOWN", "default")).toEqual("default");
  });

  test("read exist variable in environment", () => {
    const envName = "HELLO_WORLD";

    const old = write(envName, "testing");
    expect(read(envName, "default")).toEqual("testing");

    write(envName, old);
  });

  test("can set environment value", () => {
    process.env.SOMETHING_NOT_RELATE = "this";
    expect(process.env.SOMETHING_NOT_RELATE).toEqual("this");

    write("SOMETHING_NOT_RELATE", "that");
    expect(process.env.SOMETHING_NOT_RELATE).toEqual("that");
  });

  test("return old environment value", () => {
    // process.env.I_DID_NOT_THINK = "this";
    expect(process.env.I_DID_NOT_THINK).toEqual(undefined);

    const old = write("I_DID_NOT_THINK", "new");

    expect(old).toEqual(undefined);
    expect(process.env.I_DID_NOT_THINK).toEqual("new");
  });
});
