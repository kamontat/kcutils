import { accessSync, constants } from "fs";
import { access as _access } from "fs";
import { promisify } from "util";
import { join, resolve } from "path";

/**
 * @public
 * location context to search and read file content
 */
export class LocationContext {
  /**
   * search location from current path
   *
   * @param args path
   * @returns true if path file/directory is exist
   */
  async isExist(...args: string[]): Promise<boolean> {
    const access = promisify(_access);
    return access(join(...args), constants.F_OK | constants.R_OK)
      .then(() => true)
      .catch(() => false);
  }

  /**
   * search location from current path
   *
   * @param args path
   * @returns true if path file/directory is exist
   */
  isExistSync(...args: string[]): boolean {
    try {
      accessSync(join(...args), constants.F_OK | constants.R_OK);
      return true;
    } catch (e) {
      return false;
    }
  }

  async findExist(...paths: string[]): Promise<string> {
    for await (const path of paths) {
      try {
        if (await this.isExist(path)) {
          return resolve(path);
        }
      } catch (e) {
        continue;
      }
    }

    throw new Error("cannot find anything");
  }

  findExistSync(...paths: string[]): string | undefined {
    for (const path of paths) {
      try {
        if (this.isExistSync(path)) {
          return resolve(path);
        }
      } catch (e) {
        continue;
      }
    }

    return;
  }
}
