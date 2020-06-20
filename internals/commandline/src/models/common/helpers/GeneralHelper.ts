export class GeneralHelper {
  getOrElse<T>(data: T | undefined | null, def: T): T {
    if (data === undefined || data === null) return def;
    else return data;
  }
}
