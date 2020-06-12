import path from "path";

export interface ParsedFile {
  /**
   * The file name including extension (if any) such as 'index.html'
   */
  base: string;
  /**
   * The file extension (if any) such as '.html'
   */
  ext: string;
  /**
   * The file name without extension (if any) such as 'index'
   */
  name: string;
}

const filewhitelist = "________________________________";
const internal = "internal";

export class Paths {
  private readonly absolutePath: boolean;
  private readonly file: ParsedFile;
  private readonly dir: string[];

  constructor(filepath: string | null | undefined) {
    const fp = filepath?.endsWith(path.sep) ? `${filepath}${filewhitelist}` : filepath ?? "";
    const fileparsed = path.parse(fp);

    this.file = {
      base: fileparsed.base === filewhitelist ? "" : fileparsed.base,
      ext: fileparsed.ext,
      name: fileparsed.name === filewhitelist ? "" : fileparsed.name,
    };

    this.absolutePath = fileparsed.root !== "";
    if (fileparsed.dir === "") this.dir = [internal];
    else
      this.dir = path
        .normalize(fileparsed.dir)
        .split(path.sep)
        .filter(v => v !== "" && v !== "..");
  }

  get isFileExist() {
    return this.file.base !== "";
  }

  get isDirectoryExist() {
    return this.dir.length === 1 && this.dir.includes(internal);
  }

  get absolute() {
    return this.absolutePath;
  }

  get dirdeep() {
    return this.dir.length;
  }

  get filename() {
    return this.file.base;
  }

  /**
   * first will return first number of directory
   *
   * @example
   *    first(0) of /a/b/c/d.txt -> d.txt
   *    first(2) of /a/b/c/d.txt -> b/c/d.txt
   * @param num
   */
  first(num: number) {
    if (num <= 0) return this.filename;
    else
      return this.dir
        .slice(this.dir.length - num, this.dir.length)
        .concat(this.filename)
        .join(path.sep);
  }

  /**
   * get directory name at num
   *
   * @example
   *    at(2) of /a/b/c/d/e/f.txt -> d
   *    at(1) of /a/b/c/d/e/f.txt -> e
   *    at(0) of /a/b/c/d/e/f.txt -> f.txt
   * @param num num
   */
  at(num: number) {
    if (num >= this.dir.length || num < 0) return this.dir[0];
    else if (num === 0) return this.filename;
    else return this.dir[this.dir.length - num];
  }

  /**
   * after will get path after regex
   *
   *
   * @example
   *    after(/b/, 1) of /a/b/c/d/e.txt -> c
   *    after(/d/, 0) of /a/b/c/d/e.txt -> d
   *    after(/b/, 1, 1) of /a/b/c/d/e.txt -> c/d
   *    after(/d/, 0, 5) of /a/b/c/d/e.txt -> d
   * @param regex directory regex name
   * @param num number of directory after regex
   * @param size zero mean 1 directory only
   */
  after(regex: RegExp, num: number, size: number = 0): string {
    const n = num < 0 ? 0 : num;

    const index = this.dir.findIndex(v => regex.test(v));
    const targetdir = index < 0 ? this.dir[n] : this.dir[index + n];
    if (size <= 0) return targetdir ?? this.at(-1);
    else {
      const arr = [targetdir, this.after(regex, n + 1, size - 1)];
      return arr.filter(v => v !== undefined && v !== "").join(path.sep);
    }
  }

  /**
   * check is input regex include in path
   * @param regex directory or file name
   */
  includes(regex: RegExp) {
    if (regex.test(this.filename)) return true;
    else if (this.dir.some(d => regex.test(d))) return true;
    else return false;
  }
}
