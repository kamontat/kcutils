interface Helper<K extends string> {
  readonly key: K;
}

class Helpers<T extends Record<string, Helper<string>> = {}> {
  static new(): Helpers<{}> {
    return new Helpers();
  }

  private object: Record<string, Helper<string>>;
  private constructor(obj?: T) {
    this.object = {};
    if (obj) {
      Object.keys(obj).forEach((key) => {
        this.object[key] = obj[key];
      });
    }
  }

  extends<H extends Helper<string>, K extends string = H["key"]>(
    value: H
  ): Helpers<T & { [k in K]: H }> {
    const newObject = Object.assign({}, this.object, { [value.key]: value });
    return new Helpers(newObject);
  }

  get<K extends keyof T = keyof T, H extends T[K] = T[K]>(key: K): H {
    return this.object[key as string] as H;
  }
}

export default Helpers;
export { Helper };
