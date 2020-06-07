import { Package } from "package_json";

import { Dependency } from "./Dependency";
import { DependencyType } from "./DependencyType";

import { Classify } from "../query/Classify";
import { DependencyCategory } from "./DependencyCategory";

export class InternalDependency extends Dependency {
  constructor(name: string, version: string, category: DependencyCategory) {
    super(name, version, DependencyType.INTERNAL, category);
  }
}

export class InternalDependencies {
  static from(classify: Classify, p: Package) {
    return new InternalDependency(p.name, p.version, classify.type(p.name, p.version));
  }
}
