import { Query } from "./Query";
import { DependencyCategory } from "../dependencies/DependencyCategory";

export class Classify {
  constructor(private query: Query, defaults: boolean = true) {
    if (defaults) {
      query.add(DependencyCategory.TYPE, /@types.*/);
      query.add(DependencyCategory.INTERNAL, /@internal\/.*/);
    }
  }

  type(name: string, version: string): DependencyCategory {
    return this.query.find(name, version);
  }
}
