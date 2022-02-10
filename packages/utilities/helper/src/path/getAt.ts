import type { WithUndefined } from "generic";
import { parse, sep } from "path";

import isEmpty from "../generic/isEmpty";
import { internal } from "./_constants";

/**
 * get file/directory name at n position
 *
 * @example
 *    getAt("/a/b/c/d/e/f.txt", 2)  -> d
 *    getAt("/a/b/c/d/e/f.txt", 1)  -> e
 *    getAt("/a/b/c/d/e/f.txt", 0)  -> f.txt
 *    getAt("/a/b/c/d/e/f.txt", -1) -> a
 *    getAt("", -1)                 -> ''
 * @param path input absolute/relative path
 * @param n index of file/directory to get
 */
const getAt = (path: WithUndefined<string>, n: number) => {
  if (isEmpty(path)) {
    return internal;
  }

  const _path = parse(path);
  if (_path.dir === "") {
    return internal;
  }

  const dirs = _path.dir.split(sep);
  const target = dirs.length - n;
  if (n < 0 || target < 1) {
    return dirs.length > 1 ? dirs[1] : "";
  } else if (n === 0) {
    return _path.base;
  } else {
    return dirs[target];
  }
};

export default getAt;
