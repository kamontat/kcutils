import { DependencyType } from "./DependencyType";
import { DependencyCategory } from "./DependencyCategory";

export abstract class Dependency {
  constructor(
    protected _name: string,
    protected _version: string,
    protected _type: DependencyType,
    protected _category: DependencyCategory,
    protected _dependencies: Dependency[] = [],
    protected _devDependencies: Dependency[] = [],
    protected _peerDependencies: Dependency[] = []
  ) {}

  addDependOn(d: Dependency): void {
    this._dependencies.push(d);
  }

  addDevDependOn(d: Dependency): void {
    this._devDependencies.push(d);
  }

  addPeerDependOn(d: Dependency): void {
    this._peerDependencies.push(d);
  }

  get name(): string {
    return this._name;
  }

  get version(): string {
    return this._version;
  }

  get type(): DependencyType {
    return this._type;
  }

  get category(): DependencyCategory {
    return this._category;
  }

  get dependOns(): Dependency[] {
    return this._dependencies;
  }

  get devDependOns(): Dependency[] {
    return this._devDependencies;
  }

  get peerDependOns(): Dependency[] {
    return this._peerDependencies;
  }
}
