import { sep } from "path";

export interface SearchOption {
  /** shifted number from search directory */
  shift: number;
  /** output directory level */
  level: number;
}

/**
 * search path by regex and return with customize configuration
 *
 *
 * @example
 *    search("/a/b/c/d/e.txt", /b/, {shift: 1})           -> c
 *    search("/a/b/c/d/e.txt", /d/, {shift: 0})           -> d
 *    search("/a/b/c/d/e.txt", /b/, {level: 2})           -> b/c
 *    search("/a/b/c/d/e.txt", /a/, {shift: 2, level: 3}) -> c/d/e.txt
 * @param path input absolute/relative path
 * @param regex search regex
 * @param option customize output
 * @returns return found path or undefined if regex find nothing
 */
const search = (path: string, regex: RegExp, option: Partial<SearchOption>) => {
  const defaultOption = {
    shift: 0,
    level: 1,
  };

  const _option = Object.assign(defaultOption, option);

  const dirs = path.split(sep);
  const index = dirs.findIndex((v) => regex.test(v));
  if (index < 0) {
    return undefined;
  }

  const _shift = _option.shift < 0 ? 0 : _option.shift;
  const _level = _option.level < 1 ? 1 : _option.level;

  const nextIndex = Math.min(index + _shift, dirs.length - 1);
  if (_level === 1) {
    return dirs[nextIndex];
  } else {
    const lastIndex = Math.min(nextIndex + _level, dirs.length);
    return dirs.slice(nextIndex, lastIndex).join(sep);
  }
};

export default search;
