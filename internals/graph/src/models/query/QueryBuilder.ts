import { DependencyCategory } from "../dependencies/DependencyCategory";
import { QueryValue, Query } from "./Query";

export class QueryBuilder implements Query {
  static empty(): QueryBuilder {
    return new QueryBuilder();
  }

  private mapper: Map<DependencyCategory, RegExp[]>;

  constructor() {
    this.mapper = new Map();
  }

  private check(category: DependencyCategory) {
    return this.mapper.has(category);
  }

  private get(category: DependencyCategory) {
    return this.mapper.get(category);
  }

  add(category: DependencyCategory, type: QueryValue): this {
    const q: RegExp[] = [];

    if (Array.isArray(type)) {
      q.push(...type);
    } else {
      q.push(type);
    }

    if (this.check(category)) {
      const old = this.get(category) ?? [];
      q.push(...old);
    }

    this.mapper.set(category, q);
    return this;
  }

  find(name: string, version: string): DependencyCategory {
    const array: [DependencyCategory, RegExp[]][] = Array.from(this.mapper.entries());
    const result: [DependencyCategory, RegExp[]] = array.find(data => {
      const qs = data[1];
      return qs.some(q => q.test(name) || q.test(version));
    }) ?? [DependencyCategory.UNKNOWN, []];

    return result[0];
  }

  get size(): number {
    return this.mapper.size;
  }
}
