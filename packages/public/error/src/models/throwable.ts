import type { Optional } from "@kcutils/helper";

import { sep, parse } from "path";
import { format } from "util";

import {
  isExist,
  padEnd,
  search,
  getAt,
  includes,
  isProduction,
} from "@kcutils/helper/lib/node";
import ThrowState, { ThrowStateType } from "./state";

export interface ThrowableStack {
  path: string;
  typename: string | null;
  linenum: number | null;
  colmnum: number | null;
  funcname: string | null;
  method: string | null;
}

export let projectName = "example";
export const setProject = (name: string): void => {
  projectName = name;
};

export default class Throwable extends Error {
  static build(state: ThrowState, message?: string): Throwable {
    return new Throwable(
      state.code,
      state.name,
      message,
      undefined,
      state.type === ThrowStateType.WARN ? false : true
    );
  }

  static from<E extends Error>(error: E, deadly: boolean = true): Throwable {
    if (
      typeof error === "object" &&
      typeof (error as unknown as Throwable).code === "number"
    )
      return error as unknown as Throwable;

    return new Throwable(-1, error.name, error.message, error.stack, deadly);
  }

  static fn(
    state: ThrowState,
    message?: string
  ): (...a: Optional<string>[]) => Throwable {
    const templates = message;
    return (...args: Optional<string>[]) => {
      return Throwable.build(
        state,
        templates
          ? format(templates, ...args.filter((v) => isExist(v)))
          : templates
      );
    };
  }

  private readonly _stack: ThrowableStack[];

  constructor(
    public readonly code: number,
    name?: string,
    message?: string,
    stack?: string,
    public readonly deadly: boolean = true
  ) {
    super(message ?? "something went wrong");

    const obj = { stack: [] };

    const orig = Error.prepareStackTrace; // save original prepare method
    Error.prepareStackTrace = (_, stack) => stack;
    Error.captureStackTrace(obj, Throwable);
    const rawStack: NodeJS.CallSite[] = obj.stack as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    Error.prepareStackTrace = orig; // revert original method

    // Lets make our JSON object.
    this._stack = [];
    for (const frame of rawStack) {
      this._stack.push({
        path: frame.getFileName() ?? "",
        typename: frame.getTypeName(),
        linenum: frame.getLineNumber(),
        colmnum: frame.getColumnNumber(),
        funcname: frame.getFunctionName(),
        method: frame.getMethodName(),
      });
    }

    if (name !== undefined) this.name = name;
    if (stack !== undefined) this.stack = stack;

    Object.setPrototypeOf(this, Throwable.prototype);
  }

  private getDevelopmentFormatted() {
    let msg = `${this.name}(${this.code}): ${this.message}\n`;
    msg += `stacks:\n`;

    const stacks = this._stack.map((s) => {
      const typename = s.typename ? `${s.typename}.` : "";
      const funcname = s.funcname ?? s.method ?? "<anonymous>";

      const name = `${typename}${funcname}`;

      const buildDir = (regex: RegExp, start: number) => {
        const rootdir =
          search(s.path, regex, { shift: start }) ?? getAt(s.path, -1);
        const dir = search(s.path, regex, { shift: start + 1 });
        if (!dir) return `<${rootdir}>`;
        else return `<${rootdir}>/${dir}`;
      };

      let filename = "";
      const registry = /registry\.npmjs\.org/;
      const nodeModules = /node_modules/;
      if (includes(s.path, registry)) {
        filename = buildDir(registry, 1);
      } else if (includes(s.path, nodeModules)) {
        filename = buildDir(nodeModules, 1);
      } else {
        filename = buildDir(new RegExp(projectName), 0);
      }

      const linenum = s.linenum ? `:${s.linenum}` : "";
      const colnum = s.colmnum ? `:${s.colmnum}` : "";

      const path = parse(s.path);
      if (path.base !== "") {
        filename += sep;
        filename += `${path.base}`;
      }

      return {
        name,
        filename,
        linenum,
        colnum,
      };
    });

    const maximum = stacks.reduce(
      (p, c) => (c.name.length > p ? c.name.length : p),
      0
    );

    msg += `${stacks
      .map(
        (s) =>
          `  - ${padEnd(s.name, maximum)} ${s.filename}${s.linenum}${s.colnum}`
      )
      .join("\n")}`;

    return msg;
  }

  private getProductionFormatted() {
    return `${this.name}(${this.code}): ${this.message}`;
  }

  equals(e: Throwable): boolean {
    return e.code === this.code && e.name === this.name;
  }

  toString(): string {
    if (isProduction()) return this.getProductionFormatted();
    else return this.getDevelopmentFormatted();
  }
}
