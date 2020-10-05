declare module "@lerna/project" {
  import { Package } from "package_json";

  export function getPackages(cwd: string): Promise<Package[]>;
}
