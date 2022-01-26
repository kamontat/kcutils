import { parse, sep } from "path";

/**
 * get relative path size n
 *
 * @example
 *    slice("/a/b/c/d.txt", 0) -> d.txt
 *    slice("/a/b/c/d.txt", 2) -> b/c/d.txt
 * @param path input absolute/relative path
 * @param n possitive n number
 */
const slice = (path: string, n: number) => {
  const _path = parse(path);
  if (n <= 0) {
    return _path.base;
  }
  const dirs = _path.dir.split(sep);
  return dirs
    .slice(dirs.length - n, dirs.length)
    .concat(_path.base)
    .join(sep);
};

export default slice;
