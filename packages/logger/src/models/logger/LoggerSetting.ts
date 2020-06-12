export interface StrictSettingObject {
  uppercase: boolean; // default = false
  underline: boolean; // default = false
  italic: boolean; // default = false
  bold: boolean; // default = false
  prefix: string; // default = ''
  suffix: string; // default = ''
}

export type OptionalSettingObject = Partial<StrictSettingObject>;

export type StrictCommonSetting = false | StrictSettingObject;
export type OptionalCommonSetting = false | OptionalSettingObject;

export interface StrictSetting {
  datetime: StrictCommonSetting;
  scope: StrictCommonSetting;
  filename: StrictCommonSetting;
  seperator: StrictCommonSetting;
  badge: StrictCommonSetting;
  label: StrictCommonSetting;
  message: StrictCommonSetting;
  prefix: StrictCommonSetting;
  suffix: StrictCommonSetting;
  secret: StrictCommonSetting;
}

export interface OptionalSetting {
  datetime?: OptionalCommonSetting;
  scope?: OptionalCommonSetting;
  filename?: OptionalCommonSetting;
  seperator?: OptionalCommonSetting;
  badge?: OptionalCommonSetting;
  label?: OptionalCommonSetting;
  message?: OptionalCommonSetting;
  prefix?: OptionalCommonSetting;
  suffix?: OptionalCommonSetting;
  secret?: OptionalCommonSetting;
}
