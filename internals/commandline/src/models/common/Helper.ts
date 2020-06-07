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
