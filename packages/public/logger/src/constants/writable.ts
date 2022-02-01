import type { Writable } from "../models/custom/Writable";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const stdnull: Writable = (_message?: string, ..._args: any[]) => {};

export const stderr: Writable = console.error.bind(console);
export const stdout: Writable = console.log.bind(console);

export const stdebug: Writable = console.debug.bind(console);
