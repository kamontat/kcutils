declare module "package_json" {
  export class Package {
    readonly dependencies?: { [name: string]: string };
    readonly devDependencies?: { [name: string]: string };
    readonly name: string;
    readonly version: string;
    readonly peerDependencies?: { [name: string]: string };
    readonly private: boolean;
  }
}
