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

  addDependOn(d: Dependency) {
    this._dependencies.push(d);
  }

  addDevDependOn(d: Dependency) {
    this._devDependencies.push(d);
  }

  addPeerDependOn(d: Dependency) {
    this._peerDependencies.push(d);
  }

  get name() {
    return this._name;
  }

  get version() {
    return this._version;
  }

  get type() {
    return this._type;
  }

  get category() {
    return this._category;
  }

  get dependOns() {
    return this._dependencies;
  }

  get devDependOns() {
    return this._devDependencies;
  }

  get peerDependOns() {
    return this._peerDependencies;
  }
}
