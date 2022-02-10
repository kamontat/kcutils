import { parse, sep } from "path";

/**
 * check regex in path.
 * checking algorithm is ensured to check each level separately
 * @example
 *    includes("/a/b/c", /c/)    -> true
 *    includes("/ab/cd", /c/)    -> true
 *    includes("/ab/cd", /b\/c/) -> false
 * @param regex directory or file name
 */
const includes = (path: string, regex: RegExp) => {
  const _path = parse(path);
  const dirs = _path.dir.split(sep);

  if (regex.test(_path.base)) {
    return true;
  } else if (dirs.some((dir) => regex.test(dir))) {
    return true;
  }

  return false;
};

export default includes;
