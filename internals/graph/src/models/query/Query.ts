import { DependencyCategory } from "../dependencies/DependencyCategory";

export type QueryValue = RegExp;

export interface Query {
  add(category: DependencyCategory, ...q: QueryValue[]): this;

  find(app: string, version: string): DependencyCategory;
}
