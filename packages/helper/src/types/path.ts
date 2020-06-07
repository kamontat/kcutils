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

export class Paths {
  private readonly file: ParsedFile;
  private readonly dir: string[];

  constructor(filepath: string | null | undefined) {
    const fileparsed = path.parse(filepath ?? "");

    this.file = { base: fileparsed.base, ext: fileparsed.ext, name: fileparsed.name };

    if (filepath) this.dir = fileparsed.dir.split(path.sep);
    else if (fileparsed.root === "") this.dir = ["internal"];
    else this.dir = ["empty"];
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
    if (num === 0) return this.filename;
    else return this.dir.slice(this.dir.length - num, this.dir.length).join(path.sep);
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
   * @param regex directory regex name
   * @param num number of directory after regex
   * @param include include regex directory?
   */
  after(regex: RegExp, num: number) {
    const index = this.dir.findIndex(v => regex.test(v));
    if (index < 0) return this.dir[0];
    else return this.dir[index + num];
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
