import { notExist, isExist } from "@kcutils/helper";

type Replacer = (this: any, key: string, value: unknown) => unknown;

const serializer = (replacer?: Replacer, cycleReplacer?: Replacer) => {
  const stack: unknown[] = [];
  const keys: unknown[] = [];

  if (notExist(cycleReplacer)) {
    cycleReplacer = function (_key, value) {
      if (stack[0] === value) return "[Circular ~]";
      return (
        "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
      );
    };
  }

  return function (this: any, key: string, value: unknown) {
    if (stack.length > 0) {
      const thisPos = stack.indexOf(this);
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
      if (~stack.indexOf(value) && isExist(cycleReplacer)) {
        value = cycleReplacer.call(this, key, value);
      }
    } else stack.push(value);

    return notExist(replacer) ? value : replacer.call(this, key, value);
  };
};

const stringify = <T extends Record<string, any>>(
  obj: T,
  replacer?: Replacer,
  spaces?: number | string,
  cycleReplacer?: Replacer
) => {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
};

export default stringify;
