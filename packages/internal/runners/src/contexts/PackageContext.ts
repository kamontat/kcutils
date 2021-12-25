import type { Package } from "package_json";

/**
 * @public
 * current package information context
 * read from package.json file
 */
export class PackageContext {
  private _invalid: boolean;
  private _pkg: Package;

  constructor(packageContent: string) {
    this._invalid = packageContent === "";
    this._pkg = JSON.parse(packageContent);
  }

  /**
   * get "main" key from package information
   *
   * @returns main file
   */
  getMain(): string | undefined {
    if (this._invalid) return undefined;
    return this._pkg.main;
  }
}
