import { promisify } from "util";
import { resolve, dirname, basename } from "path";
import { existsSync, exists as _exists, readFileSync, readFile as _readFile } from "fs";

import { Package } from "package_json";

const exists = promisify(_exists);
const readFile = promisify(_readFile);

type QueryType = "dirname" | "json";

export class PathHelper {
  constructor(private filepath: string) {}

  /**
   * this will get cli from .bin folder in node_modules
   *
   * @param name commandline interface name
   */
  nodeCommand(name: string) {
    return this.path("node_modules", ".bin", name);
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
  async packageJson(): Promise<Package | Partial<Package>> {
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
  packageJsonSync(): Package | Partial<Package> {
    const p = this.pathEnsureSync("package.json");
    if (p !== undefined) return JSON.parse(readFileSync(p, { encoding: "utf-8" }));
    else return {}; // empty json
  }

  isPackage(input: Partial<Package> | Package): input is Package {
    return input.name !== undefined;
  }

  async searchPackageJson(key: "dependencies" | "devDependencies", searchText: string) {
    const pjson = await this.packageJson();
    if (!this.isPackage(pjson)) {
      return false;
    } else {
      return Object.keys(pjson[key] ?? {}).includes(searchText);
    }
  }

  searchPackageJsonSync(key: "dependencies" | "devDependencies", searchText: string) {
    const pjson = this.packageJsonSync();
    if (!this.isPackage(pjson)) {
      return false;
    } else {
      return Object.keys(pjson[key] ?? {}).includes(searchText);
    }
  }

  /**
   * this will append folder or file name to current path
   * this not ensure that path will be exist in file system
   * to ensure you might use pathEnsure
   *
   * @param name folder or file name
   */
  path(...name: string[]) {
    return resolve(this.filepath, ...name);
  }

  /**
   * this will ensure that return data is exist in file system
   * for sync method is pathEnsureSync
   *
   * @param name folder or file name
   */
  async pathEnsure(...name: string[]) {
    const p = this.path(...name);
    const is = await exists(p);
    if (is) return p;
    else return undefined;
  }

  /**
   * this will ensure that return data is exist in file system
   * for async method is pathEnsure
   *
   * @param name folder or file name
   */
  pathEnsureSync(...name: string[]) {
    const p = this.path(...name);
    if (existsSync(p)) return p;
    else return undefined;
  }

  /**
   * get current fullpath
   */
  get pwd() {
    return this.filepath;
  }
}
