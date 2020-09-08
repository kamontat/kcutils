import { StrictSetting } from "../models/logger/LoggerSetting";
import { LoggerSettingBuilder } from "../builder/LoggerSettingBuilder";

export const settings: StrictSetting = {
  datetime: LoggerSettingBuilder.initial().withPrefix("[").withSuffix("]").get(),
  scope: LoggerSettingBuilder.initial().withUnderline().withPrefix("[").withSuffix("]").get(),
  filename: LoggerSettingBuilder.initial().withItalic().get(),
  seperator: LoggerSettingBuilder.initial().get(),
  badge: LoggerSettingBuilder.initial().get(),
  label: LoggerSettingBuilder.initial().get(),
  message: LoggerSettingBuilder.initial().get(),
  prefix: LoggerSettingBuilder.initial().get(),
  suffix: LoggerSettingBuilder.initial().get(),
  secret: LoggerSettingBuilder.initial().withPrefix("[").withSuffix("]").get(),
};
