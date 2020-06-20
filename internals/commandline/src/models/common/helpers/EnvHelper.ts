export class EnvHelper {
  private get(name: string) {
    return process.env[name] ?? "";
  }

  set(name: string, data: string) {
    process.env[name] = data;
  }

  is(name: string, checking: boolean | string) {
    const env = this.get(name);
    if (typeof checking === "boolean" && checking === true) return env !== "";
    else if (typeof checking === "boolean" && checking === false) return env === "";
    else if (typeof checking === "string") return process.env[name] === checking;
    else return false;
  }

  regex(name: string, regex: RegExp) {
    if (this.is(name, true)) return false;
    const env = this.get(name);
    return regex.test(env);
  }

  isCI(checking: boolean | string = "true") {
    return this.is("CI", checking);
  }

  isDev(key: string = "ENV") {
    return this.regex(key, /d[(ev)(evelop)(evelopment)]/);
  }

  isProd(key: string = "ENV") {
    return this.regex(key, /p[(rod)(roduct)(roduction)]/);
  }
}
