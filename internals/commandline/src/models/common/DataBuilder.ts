import { resolve } from "path";
import { Helper } from "./Helper";
import { TransformFn, InputWrapper } from "./DataProcess";
import { Data } from "./Data";

const pjson = require("../../../package.json");
const name = pjson.name.split("/");

export interface DataBuilderOption<I, R> {
  dirname?: string;
  current?: string[];
  input: I;
  transform: TransformFn<InputWrapper<I, DataBuilderHelperString>, R>;
}

export type DataBuilderHelperString = "root" | "parent" | "current";

export class DataBuilder<I, R> extends Data<I, R, DataBuilderHelperString> {
  static build<I, R>(opts: DataBuilderOption<I, R>): Data<I, R, DataBuilderHelperString> {
    return new DataBuilder(opts);
  }

  constructor(opts: DataBuilderOption<I, R>) {
    const dirname = opts.dirname ?? process.cwd();

    const parent = resolve(dirname);
    const root = resolve(parent, "..", "..");
    const current = resolve(parent, "node_modules", ...(opts.current && opts.current.length > 0 ? opts.current : name));

    const helper = new Helper({ root: root, parent: parent, current: current });

    super({ data: opts.input, helper: helper }, opts.transform);
  }
}
