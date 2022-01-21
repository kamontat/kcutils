import type { Nullable } from "generic";

export class GeneralContext {
  /**
   * check data for null/undefined value (include empty string)
   * @param data data
   * @returns true if data exist
   */
  exist<T>(data: Nullable<T>): data is T {
    const check1 = typeof data === "string" ? data !== "" : true;
    return data !== undefined && data !== null && check1;
  }

  /**
   * get data only when data is not null, undefined or empty string
   *
   * @param def default data
   * @param data data
   */
  getOr<T>(def: T, ...data: Nullable<T>[]): T {
    const result = data.find((c) => this.exist(c));
    if (result) return result;
    else return def;
  }

  /**
   * get data only when data is not null, undefined or empty string
   *
   * @param data data
   * @param def else data
   */
  getOrElse<T>(data: Nullable<T>, def: T): T {
    if (this.exist(data)) return data;
    return def;
  }

  /**
   * override defaults value if partials value exist
   *
   * @param defaults default object
   * @param partials new object
   */
  byDefault<T>(defaults: T, ...partials: Partial<T>[]): T {
    const array = [...partials];

    return array.reduce((p, c) => {
      return Object.assign(p, c) as T;
    }, defaults) as T;
  }
}
