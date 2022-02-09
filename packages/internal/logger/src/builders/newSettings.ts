import type { Settings } from "../models/Settings";

const newSettings = <L extends string, T extends string>(
  obj: Settings<L, T>
): Settings<L, T> => {
  return obj;
};

export default newSettings;
