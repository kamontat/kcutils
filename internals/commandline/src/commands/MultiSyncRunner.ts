import { Command } from "../models/sync/Command";

export class MultiSyncRunner<T> implements Command<T[]> {
  private cs: Command<T>[];
  constructor(...cs: Command<T>[]) {
    if (cs.length > 0) this.cs = cs;
    else this.cs = [];
  }

  add(c: Command<T>): void {
    this.cs.push(c);
  }

  start(): T[] {
    return this.cs.map(c => c.start());
  }
}
