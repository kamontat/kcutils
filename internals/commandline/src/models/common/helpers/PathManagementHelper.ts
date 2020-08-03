import { PathHelper } from "./PathHelper";

export class PathManagementHelper {
  private paths: PathHelper[];

  constructor(...paths: PathHelper[]) {
    this.paths = paths;
  }

  add(...paths: string[]): this {
    this.paths.push(...paths.map(p => new PathHelper(p)));

    return this;
  }

  private loop(cb: (p: PathHelper) => string | undefined) {
    return this.paths.reduce((p, c) => {
      if (p !== undefined) return p;

      const cmd = cb(c);
      return cmd ? cmd : p;
    }, undefined as string | undefined);
  }

  nodeCommand(command: string): string | undefined {
    return this.loop(c => c.nodeCommand(command));
  }

  ensure(...paths: string[]): string | undefined {
    return this.loop(c => c.pathEnsureSync(...paths));
  }
}
