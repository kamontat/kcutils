import { generic } from "..";

type Data = string;

const check = (...d: Data[]) => {
  const env = process.env.ENV === undefined || process.env.ENV === "undefined" ? "" : process.env.ENV;
  return d.some(data => env === data);
};

export const isDevelopment = (): boolean => {
  return check("development", "develop", "dev", "d", "");
};

export const isTesting = (): boolean => {
  return check("testing", "tested", "test", "t");
};

export const isStaging = (): boolean => {
  return check("staging", "stage", "stag", "s");
};

export const isProduction = (): boolean => {
  return check("production", "product", "prod", "p");
};

export const isCI = (): boolean => {
  return process.env.CI === "true";
};

export const setEnv = (name: string, value: string | undefined): string | undefined => {
  const old = process.env[name];
  process.env[name] = value;
  return old;
};

export const read = (name: string, def: string): string => {
  const env = process.env[name];
  if (generic.isExist(env)) return env;
  else return def;
};
