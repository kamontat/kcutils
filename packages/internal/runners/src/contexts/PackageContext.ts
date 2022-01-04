import type { ReadonlyPackage } from "package_json";

/**
 * @public
 * current package information context
 * read from package.json file
 */
export class PackageContext {
  private _pkg?: ReadonlyPackage;

  constructor(packageContent: string) {
    try {
      this._pkg = JSON.parse(packageContent);
    } catch (e) {
      this._pkg = undefined;
    }
  }

  /**
   * get "main" key from package information
   *
   * @returns main file
   */
  getMain(): string | undefined {
    return this._pkg?.main;
  }
}
