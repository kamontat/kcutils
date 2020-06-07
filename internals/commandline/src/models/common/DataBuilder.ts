import { resolve } from "path";
import { Helper } from "./Helper";
import { TransformFn, InputWrapper } from "./DataProcess";
import { Data } from "./Data";

const pjson = require("../../../package.json");
const name = pjson.name.split("/");

export interface DataBuilderOption<I, R> {
  dirname?: string;
  input: I;
  transform: TransformFn<InputWrapper<I>, R>;
}

export class DataBuilder<I, R> extends Data<I, R> {
  static build<I, R>(opts: DataBuilderOption<I, R>) {
    return new DataBuilder(opts);
  }

  constructor(opts: DataBuilderOption<I, R>) {
    const dirname = opts.dirname ?? process.cwd();

    const parent = resolve(dirname);
    const root = resolve(parent, "..", "..");
    const current = resolve(parent, "node_modules", ...name);

    const helper = new Helper({ root: root, parent: parent, current: current });

    super({ data: opts.input, helper: helper }, opts.transform);
  }
}
