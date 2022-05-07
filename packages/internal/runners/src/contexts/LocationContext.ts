import {
  constants,
  accessSync,
  access as _access,
  readFileSync,
  readFile as _readFile,
} from "fs";
import { promisify } from "util";
import { join, normalize } from "path";

import { INPUT_PATHS_NOT_FOUND } from "../constants/errors";

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
   * @throws input not found if none of input paths exist
   */
  async findExist(...paths: string[]): Promise<string> {
    for await (const p of paths) {
      const path = normalize(p);
      if (await this.isExist(path)) {
        return path;
      }
    }

    throw new Error(INPUT_PATHS_NOT_FOUND);
  }

  /**
   * find which input paths is existed
   *
   * @param paths full-path
   * @returns first existing path
   * @throws input not found if none of input paths exist
   */
  findExistSync(...paths: string[]): string {
    for (const p of paths) {
      const path = normalize(p);
      if (this.isExistSync(path)) {
        return path;
      }
    }

    throw new Error(INPUT_PATHS_NOT_FOUND);
  }

  /**
   * read first existing input file content
   * @param paths list of full-path
   * @returns first file content
   * @throws input not found if none of input paths exist
   */
  async readFirst(...paths: string[]): Promise<string> {
    const readFile = promisify(_readFile);
    const validPath = await this.findExist(...paths);

    return readFile(validPath, "utf-8");
  }

  /**
   * read first existing input file content
   * @param paths list of full-path
   * @returns first file content
   * @throws input not found if none of input paths exist
   */
  async readFirstSync(...paths: string[]): Promise<string> {
    const validPath = this.findExistSync(...paths);
    return readFileSync(validPath, "utf-8");
  }
}
