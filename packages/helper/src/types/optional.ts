type Checking<I, O> = (t: I) => O;

export class Optional<T> {
  private readonly data: T;
  private readonly empty: boolean;

  constructor(data: T | undefined | null, extra?: Checking<T, boolean>) {
    const checking = extra ?? (() => true);
    const exist = data !== undefined && data !== null && checking(data);
    this.empty = !exist;
    this.data = data as T;
  }

  get() {
    if (this.empty) throw new Error("input data is empty");
    else return this.data;
  }

  getOrElse(def: T) {
    if (this.empty) return def;
    else return this.data;
  }

  orUndefined() {
    if (this.empty) return undefined;
    else return this.data;
  }

  isEmpty() {
    return this.empty;
  }

  isNotEmpty() {
    return !this.isEmpty();
  }
}
