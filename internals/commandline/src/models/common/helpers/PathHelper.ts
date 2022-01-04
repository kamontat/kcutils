import { promisify } from "util";
import { resolve, dirname, basename } from "path";
import {
  existsSync,
  access,
  readFileSync,
  readFile as _readFile,
  constants,
} from "fs";

import { OptionalReadonlyPackage, ReadonlyPackage } from "package_json";

const exists = promisify(access);
const readFile = promisify(_readFile);

type QueryType = "dirname" | "json";

export class PathHelper {
  static nodeModules = "node_modules";
  static bin = ".bin";

  constructor(private filepath: string) {}

  /**
   * this will get modules directory from node_modules folder
   *
   * @param name commandline interface name
   */
  nodeModules(name: string): string | undefined {
    return this.pathEnsureSync(PathHelper.nodeModules, name);
  }

  /**
   * this will get cli from .bin folder in node_modules
   *
   * @param name commandline interface name
   */
  nodeCommand(name: string): string | undefined {
    return this.pathEnsureSync(PathHelper.nodeModules, PathHelper.bin, name);
  }

  projectName(by: QueryType = "dirname", scope: boolean = true): string {
    if (by === "dirname") {
      const base = basename(this.filepath);

      const dirpath = dirname(this.filepath);
      const dir = basename(dirpath);

      if (dir.includes("@") && scope) return `${dir}/${base}`;
      else return base;
    } else if (by === "json") {
      const pjson = this.packageJsonSync();
      const name = pjson.name ?? "";
      if (name.includes("/")) return scope ? name : name.split("/")[1] ?? name;
      else return name;
    } else {
      return "unknown";
    }
  }

  /**
   * this will load package.json file if exist, if not will return {}
   * for sync method see packageJsonSync
   */
  async packageJson(): Promise<OptionalReadonlyPackage> {
    const p = await this.pathEnsure("package.json");
    if (p !== undefined) {
      const content = await readFile(p, { encoding: "utf-8" });
      return JSON.parse(content);
    } else return {}; // empty json
  }

  /**
   * this will load package.json file if exist, if not will return {}
   * for async method see packageJson
   */
  packageJsonSync(): OptionalReadonlyPackage {
    const p = this.pathEnsureSync("package.json");
    if (p !== undefined)
      return JSON.parse(readFileSync(p, { encoding: "utf-8" }));
    else return {}; // empty json
  }

  isPackage(input: OptionalReadonlyPackage): input is ReadonlyPackage {
    return input.name !== undefined;
  }

  async searchPackageJson(
    key: "dependencies" | "devDependencies",
    searchText: string
  ): Promise<boolean> {
    const pjson = await this.packageJson();
    if (!this.isPackage(pjson)) {
      return false;
    } else {
      return Object.keys(pjson[key] ?? {}).includes(searchText);
    }
  }

  searchPackageJsonSync(
    key: "dependencies" | "devDependencies" | "all",
    searchText: string | RegExp
  ): boolean {
    const pjson = this.packageJsonSync();
    if (!this.isPackage(pjson)) {
      return false;
    } else {
      const arr =
        key === "all"
          ? Object.keys(pjson.dependencies ?? {}).concat(
              Object.keys(pjson.devDependencies ?? {})
            )
          : Object.keys(pjson[key] ?? {});

      if (typeof searchText === "string") return arr.includes(searchText);
      else return arr.some((dep) => searchText.test(dep));
    }
  }

  /**
   * this will append folder or file name to current path
   * this not ensure that path will be exist in file system
   * to ensure you might use pathEnsure
   *
   * @param name folder or file name
   */
  path(...name: string[]): string {
    return resolve(this.filepath, ...name);
  }

  /**
   * this will ensure that return data is exist in file system
   * for sync method is pathEnsureSync
   *
   * @param name folder or file name
   */
  async pathEnsure(...name: string[]): Promise<string | undefined> {
    const p = this.path(...name);
    try {
      await exists(p, constants.F_OK | constants.R_OK);
      return p;
    } catch (e) {
      return undefined;
    }
  }

  /**
   * this will ensure that return data is exist in file system
   * for async method is pathEnsure
   *
   * @param name folder or file name
   */
  pathEnsureSync(...name: string[]): string | undefined {
    const p = this.path(...name);
    if (existsSync(p)) return p;
    else return undefined;
  }

  /**
   * get current fullpath
   */
  get pwd(): string {
    return this.filepath;
  }
}
