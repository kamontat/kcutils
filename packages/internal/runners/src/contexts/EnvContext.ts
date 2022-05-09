export class EnvContext {
  constructor(private _valueMapper: Record<string, string | undefined>) {}

  private get(name: string) {
    return this._valueMapper[name] ?? "";
  }

  set(name: string, data: string): void {
    this._valueMapper[name] = data;
  }

  is(name: string, checking: boolean | string): boolean {
    const env = this.get(name);
    if (typeof checking === "boolean" && checking === true) return env !== "";
    else if (typeof checking === "boolean" && checking === false)
      return env === "";
    else if (typeof checking === "string") return env === checking;
    else return false;
  }

  regex(name: string, regex: RegExp): boolean {
    if (this.is(name, false)) return false;
    const env = this.get(name);
    return regex.test(env);
  }

  isDebug(checking: boolean | string = "true"): boolean {
    return this.is("DEBUG", checking);
  }

  isCI(checking: boolean | string = "true"): boolean {
    return this.is("CI", checking);
  }

  isDev(key = "ENV"): boolean {
    // either 'dev', 'develop', 'development'
    return this.regex(key, /d[(ev)(evelop)(evelopment)]/);
  }

  isProd(key = "ENV"): boolean {
    // either 'prod', 'product', 'production'
    return this.regex(key, /p[(rod)(roduct)(roduction)]/);
  }
}
