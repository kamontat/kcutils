import { Dependency } from "./Dependency";

export class Dependencies {
  private deps: Map<string, Dependency>;

  constructor() {
    this.deps = new Map();
  }

  add(d: Dependency) {
    this.deps.set(d.name, d);
  }

  get(name: string): Dependency | undefined {
    return this.deps.get(name);
  }

  loop(fn: (d: Dependency) => void) {
    this.deps.forEach(d => fn(d));
  }
}
