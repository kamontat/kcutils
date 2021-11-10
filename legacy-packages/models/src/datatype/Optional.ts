import { generic } from "@kcutils/helper";

type Checking<I, O> = (t: I) => O;

const alwaysTrue = () => true;

export class Optional<T> {
  private readonly data: T;
  private readonly empty: boolean;

  constructor(data: T | undefined | null, extra?: Checking<T, boolean>) {
    const checking = extra ?? alwaysTrue;
    const exist = generic.isExist(data) && checking(data);
    this.empty = !exist;
    this.data = data as T;
  }

  get(): T {
    if (this.empty) throw new Error("input data is empty");
    else return this.data;
  }

  getOrElse(def: T): T {
    if (this.empty) return def;
    else return this.data;
  }

  orUndefined(): T | undefined {
    if (this.empty) return undefined;
    else return this.data;
  }

  isEmpty(): boolean {
    return this.empty;
  }

  isNotEmpty(): boolean {
    return !this.isEmpty();
  }
}
