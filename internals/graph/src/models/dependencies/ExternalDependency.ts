import { Dependency } from "./Dependency";
import { DependencyCategory } from "./DependencyCategory";
import { DependencyType } from "./DependencyType";
import { Dependencies } from "./Dependencies";
import { Classify } from "../query/Classify";

export class ExternalDependency extends Dependency {
  constructor(name: string, version: string, category: DependencyCategory) {
    super(name, version, DependencyType.EXTERNAL, category);
  }
}

export class ExternalDependencies {
  static from(classify: Classify, p: Record<string, string>, internal: Dependencies): ExternalDependency[] {
    return Object.keys(p)
      .map(name => {
        const i = internal.get(name);
        if (i) return i;

        const version = p[name];
        return new ExternalDependency(name, version, classify.type(name, version));
      })
      .filter(v => {
        if (v.type === DependencyType.EXTERNAL) {
          return v.category !== DependencyCategory.UNKNOWN;
        }
        return true;
      });
  }
}
