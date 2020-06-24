import { PathHelper } from "./PathHelper";

export class PathManagementHelper {
  constructor(private root: PathHelper, private parent: PathHelper, private current: PathHelper) {}

  nodeCommand(command: string): string | undefined {
    const current = this.current.nodeCommand(command);
    if (current) return current;
    const parent = this.parent.nodeCommand(command);
    if (parent) return parent;
    const root = this.root.nodeCommand(command);
    if (root) return root;
    return undefined;
  }

  ensure(...paths: string[]): string | undefined {
    const current = this.current.pathEnsureSync(...paths);
    if (current) return current;
    const parent = this.parent.pathEnsureSync(...paths);
    if (parent) return parent;
    const root = this.root.pathEnsureSync(...paths);
    if (root) return root;
    return undefined;
  }
}
