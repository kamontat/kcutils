import parser from "minimist";
import { PathHelper } from "./PathHelper";

type HelperOption = { root: string; parent: string; current: string };

export class Helper {
  private rootHelper: PathHelper;
  private parentHelper: PathHelper;
  private currentHelper: PathHelper;

  constructor(private opts: HelperOption) {
    this.rootHelper = new PathHelper(this.opts.root);
    this.parentHelper = new PathHelper(this.opts.parent);
    this.currentHelper = new PathHelper(this.opts.current);
  }

  isEnv(name: string, checking: boolean | string) {
    const env = process.env[name] ?? "";
    if (typeof checking === "boolean" && checking === true) return env !== "";
    else if (typeof checking === "string") return process.env[name] === checking;
    else return false;
  }

  parser(data: string[], opts?: parser.Opts) {
    return parser(data, opts);
  }

  get root() {
    return this.rootHelper;
  }

  get parent() {
    return this.parentHelper;
  }

  get current() {
    return this.currentHelper;
  }
}
