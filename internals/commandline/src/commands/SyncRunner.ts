import { DataChain } from "../models/sync/DataChain";
import { Command } from "../models/sync/Command";

export class SyncRunner<O, P, R> extends DataChain<O, P, R> implements Command<R> {
  start() {
    return this.build();
  }
}
