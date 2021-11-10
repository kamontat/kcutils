import { settings } from "../src/constants/settings";
import { StrictSettingObjectKey } from "../src/models/logger/LoggerSetting";
import { LoggerSettingBuilder } from "../src";

const init = (): LoggerSettingBuilder => {
  return LoggerSettingBuilder.initial();
};

describe("Logger Setting", () => {
  const defaultSetting = Object.assign({}, settings);

  describe("predefined", () => {
    test("check data should not be undefined", () => {
      expect(defaultSetting).toHaveProperty("datetime");
      expect(defaultSetting).toHaveProperty("scope");
      expect(defaultSetting).toHaveProperty("filename");
      expect(defaultSetting).toHaveProperty("seperator");
      expect(defaultSetting).toHaveProperty("badge");
      expect(defaultSetting).toHaveProperty("label");
      expect(defaultSetting).toHaveProperty("message");
      expect(defaultSetting).toHaveProperty("prefix");
      expect(defaultSetting).toHaveProperty("suffix");
      expect(defaultSetting).toHaveProperty("secret");
    });
  });

  describe("new", () => {
    test("new disabled setting", () => {
      const setting = LoggerSettingBuilder.disabled().get();
      expect(setting).toEqual(false);
    });

    test("new re-enabled setting", () => {
      const disabledBuilder = LoggerSettingBuilder.disabled();
      expect(disabledBuilder.get()).toEqual(false);

      const enabledBuilder = disabledBuilder.withEnabled();
      expect(enabledBuilder.get()).not.toEqual(false);
    });

    test("new upper case setting", () => {
      const setting = init().withUpperCase(true).get();
      expect(setting).toHaveProperty("uppercase");

      if (setting !== false) {
        expect(setting.uppercase).toEqual(true);
      } else {
        fail("setting is false");
      }
    });

    test("reupdate to always use latest setting", () => {
      const setting = init().withBold().withBold(false).get();
      expect(setting).toHaveProperty("bold");

      if (setting !== false) {
        expect(setting.bold).toEqual(false);
      } else {
        fail("setting is false");
      }
    });

    test.each([
      [init().withItalic(), "italic" as StrictSettingObjectKey, true],
      [init().withItalic(undefined), "italic" as StrictSettingObjectKey, true],
      [init().withItalic(true), "italic" as StrictSettingObjectKey, true],
      [init().withItalic(false), "italic" as StrictSettingObjectKey, false],

      [init().withUpperCase(), "uppercase" as StrictSettingObjectKey, true],
      [init().withUpperCase(undefined), "uppercase" as StrictSettingObjectKey, true],
      [init().withUpperCase(true), "uppercase" as StrictSettingObjectKey, true],
      [init().withUpperCase(false), "uppercase" as StrictSettingObjectKey, false],

      [init().withUnderline(), "underline" as StrictSettingObjectKey, true],
      [init().withUnderline(undefined), "underline" as StrictSettingObjectKey, true],
      [init().withUnderline(true), "underline" as StrictSettingObjectKey, true],
      [init().withUnderline(false), "underline" as StrictSettingObjectKey, false],

      [init().withBold(), "bold" as StrictSettingObjectKey, true],
      [init().withBold(undefined), "bold" as StrictSettingObjectKey, true],
      [init().withBold(true), "bold" as StrictSettingObjectKey, true],
      [init().withBold(false), "bold" as StrictSettingObjectKey, false],
    ])("'%p': building setting be expected %s is %s", (b, key, value) => {
      const setting = b.get();

      if (setting !== false) {
        expect(setting[key]).toEqual(value);
      } else {
        fail("setting is false");
      }
    });
  });
});
