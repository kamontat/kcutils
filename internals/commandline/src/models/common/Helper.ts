import { PathManagementHelper } from "./helpers/PathManagementHelper";
import { PathHelper } from "./helpers/PathHelper";
import { LogHelper } from "./helpers/LogHelper";
import { ArgumentHelper } from "./helpers/ArgumentHelper";
import { EnvHelper } from "./helpers/EnvHelper";
import { GeneralHelper } from "./helpers/GeneralHelper";

type HelperOption = { root: string; parent: string; current: string };

export class Helper {
  private pathHelper: PathManagementHelper;
  private rootHelper: PathHelper;
  private parentHelper: PathHelper;
  private currentHelper: PathHelper;

  private generalHelper: GeneralHelper;

  private envHelper: EnvHelper;
  private argumentHelper: ArgumentHelper;
  private logHelper: LogHelper;

  constructor(private opts: HelperOption) {
    this.generalHelper = new GeneralHelper();

    this.rootHelper = new PathHelper(this.opts.root);
    this.parentHelper = new PathHelper(this.opts.parent);
    this.currentHelper = new PathHelper(this.opts.current);
    this.pathHelper = new PathManagementHelper(this.root, this.parent, this.current);

    this.argumentHelper = new ArgumentHelper();
    this.logHelper = new LogHelper();
    this.envHelper = new EnvHelper();
  }

  get general() {
    return this.generalHelper;
  }

  get env() {
    return this.envHelper;
  }

  get argument() {
    return this.argumentHelper;
  }

  get log() {
    return this.logHelper;
  }

  get path() {
    return this.pathHelper;
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
