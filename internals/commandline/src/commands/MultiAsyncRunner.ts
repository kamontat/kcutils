import { Command } from "../models/async/Command";

export class MultiAsyncRunner<T> implements Command<T[]> {
  private cs: Command<T>[];
  constructor(...cs: Command<T>[]) {
    if (cs.length > 0) this.cs = cs;
    else this.cs = [];
  }

  add(c: Command<T>): this {
    this.cs.push(c);
    return this;
  }

  start(): Promise<T[]> {
    const arr = this.cs.map(c => c.start());
    return Promise.all(arr);
  }
}
