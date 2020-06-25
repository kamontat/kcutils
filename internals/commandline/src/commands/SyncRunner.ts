import { DataChain } from "../models/sync/DataChain";
import { Command } from "../models/sync/Command";

export class SyncRunner<O, P, R, H extends string> extends DataChain<O, P, R, H> implements Command<R> {
  start(): R {
    return this.build();
  }
}
