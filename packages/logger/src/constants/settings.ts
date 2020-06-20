import { StrictSetting, StrictSettingObject } from "../models/logger/LoggerSetting";
import { json } from "@kcutils/helper";

const defaultSettings: StrictSettingObject = {
  uppercase: false,
  underline: false,
  bold: false,
  italic: false,
  prefix: "",
  suffix: "",
};

const build = <T>(t: T): StrictSettingObject & T => {
  return json.deepMerge(defaultSettings, t);
};

export const settings: StrictSetting = {
  datetime: build({ type: "datetime", prefix: "[", suffix: "]" }),
  scope: build({ underline: true, prefix: "[", suffix: "]" }),
  filename: build({ italic: true }),
  seperator: build({}),
  badge: build({}),
  label: build({}),
  message: build({}),
  prefix: build({}),
  suffix: build({}),
  secret: build({ prefix: "[", suffix: "]" }),
};
