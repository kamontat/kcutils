declare module "package_json" {
  export class Package {
    readonly name: string;
    readonly version: string;
    readonly private: boolean;
    readonly description?: string;
    readonly typedocMain?: string;
    readonly main?: string;
    readonly dependencies?: { [name: string]: string };
    readonly devDependencies?: { [name: string]: string };
    readonly peerDependencies?: { [name: string]: string };
  }
}
