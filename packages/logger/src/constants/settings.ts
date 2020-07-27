import { StrictSetting, StrictSettingObject } from "../models/logger/LoggerSetting";
import { json } from "@kcutils/helper";

export const defaultSettings: StrictSettingObject = {
  uppercase: false,
  underline: false,
  bold: false,
  italic: false,
  prefix: "",
  suffix: "",
};

export const settingBuilder = <T>(t: T): StrictSettingObject & T => {
  return json.deepMerge(defaultSettings, t);
};

export const settings: StrictSetting = {
  datetime: settingBuilder({ prefix: "[", suffix: "]" }),
  scope: settingBuilder({ underline: true, prefix: "[", suffix: "]" }),
  filename: settingBuilder({ italic: true }),
  seperator: settingBuilder({}),
  badge: settingBuilder({}),
  label: settingBuilder({}),
  message: settingBuilder({}),
  prefix: settingBuilder({}),
  suffix: settingBuilder({}),
  secret: settingBuilder({ prefix: "[", suffix: "]" }),
};
