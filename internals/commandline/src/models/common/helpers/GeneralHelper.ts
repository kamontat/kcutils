export class GeneralHelper {
  getOrElse<T>(data: T | undefined | null, def: T): T {
    if (data === undefined || data === null) return def;
    else if (typeof data === "string" && data === "") return def;
    else return data;
  }
}
