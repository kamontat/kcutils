import { accessSync, constants } from "fs";
import { access as _access } from "fs";
import { promisify } from "util";
import { join } from "path";

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
    try {
      const access = promisify(_access);
      await access(join(...args), constants.F_OK | constants.R_OK);
      return true;
    } catch (e) {
      return false;
    }
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
}
