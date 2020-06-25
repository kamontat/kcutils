import { DataChain } from "../models/async/DataChain";
import { Command } from "../models/async/Command";

export class AsyncRunner<O, P, R, H extends string> extends DataChain<O, P, R, H> implements Command<R> {
  start(): Promise<R> {
    return this.build();
  }
}
