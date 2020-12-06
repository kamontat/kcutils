import { Locale } from "../../src/models/Locale";

describe("Locale models", () => {
  describe.each([
    ["en", "en", undefined, undefined, "en"],
    ["en-US", "en", "US", undefined, "en-US"],
    ["en_US", "en", "US", undefined, "en-US"],
    ["ha_Latn_NG", "ha", "Latn", "NG", "ha-Latn-NG"],
  ])("Create Locale: '%s'", (input, language, country, extra, fullName) => {
    const locale = new Locale(input);

    test(`return language as ${language}`, () => {
      expect(locale.language).toEqual(language);
    });

    test(`return country as ${country}`, () => {
      expect(locale.country).toEqual(country);
    });

    test(`return extra as ${extra}`, () => {
      expect(locale.extra).toEqual(extra);
    });

    test(`return full name as ${fullName}`, () => {
      expect(locale.fullName).toEqual(fullName);
    });
  });
});
