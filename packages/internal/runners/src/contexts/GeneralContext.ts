export class GeneralContext {
  /**
   * get data only when data is not null, undefined or empty string
   *
   * @param data data
   * @param def else data
   */
  getOrElse<T>(data: T | undefined | null, def: T): T {
    if (data === undefined || data === null) return def;
    else if (typeof data === "string" && data === "") return def;
    else return data;
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
