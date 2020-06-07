import { isDevelopment, isStaging, isProduction, isTesting, isCI } from "..";

const setCI = (str: string | undefined) => {
  const old = process.env.CI;
  process.env.CI = str;
  return old;
};

const setEnv = (str: string | undefined) => {
  const old = process.env.ENV;
  process.env.ENV = str;
  return old;
};

describe("Environment Helper", () => {
  test("check undefined env", () => {
    const old = setEnv(undefined);

    expect(isDevelopment()).toBeTruthy();
    expect(isStaging()).toBeFalsy();
    expect(isProduction()).toBeFalsy();
    expect(isTesting()).toBeFalsy();

    setEnv(old);
  });

  test("check development", () => {
    const old = setEnv("development");

    expect(isDevelopment()).toBeTruthy();
    expect(isStaging()).toBeFalsy();

    setEnv(old);
  });

  test("check staging", () => {
    const old = setEnv("staging");

    expect(isStaging()).toBeTruthy();
    expect(isProduction()).toBeFalsy();

    setEnv(old);
  });

  test("check development", () => {
    const old = setEnv("prod");

    expect(isProduction()).toBeTruthy();
    expect(isTesting()).toBeFalsy();

    setEnv(old);
  });

  test("check dev", () => {
    const old = setEnv("dev");

    expect(isDevelopment()).toBeTruthy();
    expect(isStaging()).toBeFalsy();

    setEnv(old);
  });

  test("check d", () => {
    const old = setEnv("d");

    expect(isDevelopment()).toBeTruthy();
    expect(isStaging()).toBeFalsy();

    setEnv(old);
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
});
