// lang will be
import { generic, type } from "@kcutils/helper";
import { Locale } from "../models/Locale";

export interface LanguageOption {
  fallback: string;
}

export const getLang = (opt?: Partial<LanguageOption>): type.WithUndefined<Locale> => {
  if (generic.noExist(window)) {
    return undefined;
  }

  const navigator: any = window.navigator;

  const lang: string | undefined = generic.toOptional<string>(
    (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.browserLanguage ||
      navigator.userLanguage ||
      navigator.systemLanguage
  );

  // when no option exist
  if (generic.noExist(opt)) return (lang && new Locale(lang)) || undefined;

  // when use input fallback language
  if (generic.noExist(lang) && generic.isExist(opt.fallback)) return new Locale(opt.fallback);

  // when success get browser language
  return (lang && new Locale(lang)) || undefined;
};
