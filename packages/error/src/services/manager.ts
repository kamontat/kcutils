import { EventEmitter } from "events";
import Throwable from "../models/throwable";

export type RunFn<R> = () => R;

export enum EventType {
  NEW_ERROR = "new-error",
}

export abstract class AbstractManager extends EventEmitter {
  emit(event: EventType, ...args: [Throwable]): boolean {
    return super.emit(event, ...args);
  }
  on(event: EventType.NEW_ERROR, listener: (...args: [Throwable]) => void): this {
    return super.on(event, listener);
  }
}

export default class Manager extends AbstractManager {
  private errors: Throwable[];

  constructor() {
    super();
    this.errors = [];
  }

  run<R>(fn: RunFn<R>): R | undefined {
    try {
      return fn();
    } catch (e) {
      this.add(e);
      return undefined;
    }
  }

  runFuture<R>(fn: RunFn<Promise<R>>): Promise<R | undefined> {
    return fn().catch(e => {
      this.add(e);
      return undefined;
    });
  }

  reset() {
    this.errors = [];
    return this;
  }

  hasDeadly() {
    return this.errors.some(v => {
      return v.deadly;
    });
  }

  formatted() {
    if (this.size > 0) {
      let msg = "Errors: \n";
      msg += this.errors.map(e => `  - ${e.toString()}`);
      return msg;
    } else return "";
  }

  get size() {
    return this.errors.length;
  }

  private add<E extends Error>(err: E) {
    const throwable = Throwable.from(err);
    this.emit(EventType.NEW_ERROR, throwable);
    this.errors.push(throwable);
  }
}
