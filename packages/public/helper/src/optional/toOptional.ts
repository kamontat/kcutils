import isExist from "../generic/isExist";

type Checking<I, O> = (t: I) => O;

const alwaysTrue = () => true;

export class Optional<T> {
  private readonly data: T;
  private readonly empty: boolean;

  /**
   * Create optional object for null-safe in typescript language
   *
   * @param data input data
   * @param extra extra function to check existness
   */
  constructor(data: T | undefined | null, extra?: Checking<T, boolean>) {
    const checking = extra ?? alwaysTrue;
    const exist = isExist(data) && checking(data);

    this.empty = !exist;
    this.data = data as T;
  }

  /**
   * get data or throw error if data is not exist
   *
   * @returns data if exist
   * @throws Error when data is not exist
   */
  get(): T {
    if (this.empty) throw new Error("input data is empty");
    else return this.data;
  }

  /**
   * get data or default value
   *
   * @param def default data
   * @returns data or default if data is not exist
   */
  getOrElse(def: T): T {
    if (this.empty) return def;
    else return this.data;
  }

  /**
   * get data or undefined
   *
   * @returns data or undefined
   */
  orUndefined(): T | undefined {
    if (this.empty) return undefined;
    else return this.data;
  }

  /**
   * true if data is not exist or empty
   * @returns is data empty/exist
   */
  isEmpty(): boolean {
    return this.empty;
  }

  /**
   * true if data is exist or not empty
   * @returns is data empty/exist
   */
  isNotEmpty(): boolean {
    return !this.empty;
  }
}

const toOptional = <T>(
  data: T | undefined | null,
  extra?: Checking<T, boolean>
): Optional<T> => {
  return new Optional<T>(data, extra);
};

export default toOptional;
