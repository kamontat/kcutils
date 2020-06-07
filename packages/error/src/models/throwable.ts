import { Paths, isProduction } from "@kcutils/helper";

import { ThrowState, ThrowStateType } from "./state";

export interface ThrowableStack {
  path: Paths;
  typename: string | null;
  linenum: number | null;
  colmnum: number | null;
  funcname: string | null;
  method: string | null;
}

export let projectName = "example";
export const setProject = (name: string) => {
  projectName = name;
};

export default class Throwable extends Error {
  static build(state: ThrowState, message?: string): Throwable {
    return new Throwable(state.code, state.name, message, undefined, state.type === ThrowStateType.WARN ? false : true);
  }

  static from<E extends Error>(error: E, deadly: boolean = true): Throwable {
    if (typeof error === "object" && typeof ((error as unknown) as Throwable).code === "number")
      return (error as unknown) as Throwable;

    return new Throwable(-1, error.name, error.message, error.stack, deadly);
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
        path: new Paths(frame.getFileName()),
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

    msg += `    stacks:\n`;
    msg += `${this._stack
      .map(s => {
        const typename = s.typename ? `${s.typename}.` : "";
        const funcname = s.funcname ?? s.method ?? "<anonymous>";

        const name = `${typename}${funcname}`.padEnd(30, " ");

        const registry = /registry\.npmjs\.org/;
        const extLibName = `<${s.path.after(registry, 1)}>/${s.path.filename}`;
        const intLibName = `<${s.path.after(new RegExp(projectName), 2)}>/${s.path.after(new RegExp(projectName), 3)}/${
          s.path.filename
        }`;

        const filename = s.path.includes(registry) ? extLibName : intLibName;

        return `      - ${name} ${filename}:${s.linenum}:${s.colmnum}`;
      })
      .join("\n")}`;
    return msg;
  }

  private getProductionFormatted() {
    return `${this.name}(${this.code}): ${this.message}`;
  }

  equals(e: Throwable) {
    return e.code === this.code && e.name === this.name;
  }

  toString() {
    if (isProduction()) return this.getProductionFormatted();
    else return this.getDevelopmentFormatted();
  }
}
