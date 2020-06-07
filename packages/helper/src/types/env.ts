type Data = string;

const check = (...d: Data[]) => {
  const env = process.env.ENV === undefined || process.env.ENV === "undefined" ? "" : process.env.ENV;
  return d.some(data => env === data);
};

export const isDevelopment = () => {
  return check("development", "develop", "dev", "d", "");
};

export const isTesting = () => {
  return check("testing", "tested", "test", "t");
};

export const isStaging = () => {
  return check("staging", "stage", "stag", "s");
};

export const isProduction = () => {
  return check("production", "product", "prod", "p");
};

export const isCI = () => {
  return process.env.CI === "true";
};

export const setEnv = (name: string, value: string | undefined) => {
  const old = process.env[name];
  process.env[name] = value;
  return old;
};
