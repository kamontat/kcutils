import { accessSync, constants, access as _access } from "fs";
import { promisify } from "util";
import { join, resolve } from "path";

/**
 * @public
 * location context to search and read file content
 */
export class LocationContext {
  /**
   * mirror path.join()
   *
   * @param args paths to join
   * @returns
   */
  join(...args: string[]): string {
    return join(...args);
  }

  /**
   * check whether input args is existing
   *
   * @param args paths to join
   * @returns true if path file/directory is exist
   */
  async isExist(...args: string[]): Promise<boolean> {
    const access = promisify(_access);
    return access(this.join(...args), constants.F_OK | constants.R_OK)
      .then(() => true)
      .catch(() => false);
  }

  /**
   * check whether input args is existing
   *
   * @param args array path that will join to single path
   * @returns true if path file/directory is exist
   */
  isExistSync(...args: string[]): boolean {
    try {
      accessSync(this.join(...args), constants.F_OK | constants.R_OK);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * find which input paths is existed
   *
   * @param paths full-path
   * @returns first existing path
   */
  async findExist(...paths: string[]): Promise<string> {
    for await (const path of paths) {
      if (await this.isExist(path)) {
        return resolve(path);
      }
    }

    throw new Error("cannot find existing path");
  }

  /**
   * find which input paths is existed
   *
   * @param paths full-path
   * @returns first existing path
   */
  findExistSync(...paths: string[]): string {
    for (const path of paths) {
      if (this.isExistSync(path)) {
        return resolve(path);
      }
    }

    throw new Error("cannot find existing path");
  }
}
