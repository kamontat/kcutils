import { PathManagementHelper } from "./helpers/PathManagementHelper";
import { PathHelper } from "./helpers/PathHelper";
import { LogHelper } from "./helpers/LogHelper";
import { ArgumentHelper } from "./helpers/ArgumentHelper";
import { EnvHelper } from "./helpers/EnvHelper";
import { GeneralHelper } from "./helpers/GeneralHelper";
import { QuestionHelper } from "./helpers/QuestionHelper";

type HelperOption<T extends string> = Record<T, string>;

export class Helper<T extends string> {
  private pathHelper: PathManagementHelper;

  private subPathHelper: Map<T, PathHelper>;

  private generalHelper: GeneralHelper;

  private envHelper: EnvHelper;
  private argumentHelper: ArgumentHelper;
  private logHelper: LogHelper;
  private questionHelper: QuestionHelper;

  constructor(opts: HelperOption<T>) {
    this.generalHelper = new GeneralHelper();
    this.subPathHelper = new Map();

    (Object.keys(opts) as Array<T>).forEach(key => {
      const value = opts[key];
      this.subPathHelper.set(key, new PathHelper(value));
    });

    this.pathHelper = new PathManagementHelper(...Array.from(this.subPathHelper.values()));

    this.argumentHelper = new ArgumentHelper();
    this.logHelper = new LogHelper();
    this.envHelper = new EnvHelper();
    this.questionHelper = new QuestionHelper();
  }

  get general(): GeneralHelper {
    return this.generalHelper;
  }

  get env(): EnvHelper {
    return this.envHelper;
  }

  get argument(): ArgumentHelper {
    return this.argumentHelper;
  }

  get log(): LogHelper {
    return this.logHelper;
  }

  get path(): PathManagementHelper {
    return this.pathHelper;
  }

  on(type: T): PathHelper {
    return this.subPathHelper.get(type) ?? new PathHelper(process.cwd());
  }

  get question(): QuestionHelper {
    return this.questionHelper;
  }
}
