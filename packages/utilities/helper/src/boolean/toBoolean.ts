import notExist from "../generic/notExist";
import isNumber from "../number/isNumber";
import isBoolean from "./isBoolean";
import isString from "../string/isString";

const toBoolean = <T = unknown>(input: T): boolean | undefined => {
  if (notExist(input)) return undefined;
  else if (isBoolean(input)) return input;
  else if (isNumber(input)) {
    const isTrue = input === 1;
    const isFalse = input === 0;

    if (isTrue) return true;
    else if (isFalse) return false;
    else return undefined;
  } else if (isString(input)) {
    const isTrue = input === "true" || input === "1";
    const isFalse = input === "false" || input === "0";

    if (isTrue) return true;
    else if (isFalse) return false;
    else return undefined;
  } else return undefined;
};

export default toBoolean;
