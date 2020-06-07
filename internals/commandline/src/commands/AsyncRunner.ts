import { DataChain } from "../models/async/DataChain";
import { Command } from "../models/async/Command";

export class AsyncRunner<O, P, R> extends DataChain<O, P, R> implements Command<R> {
  start() {
    return this.build();
  }
}
