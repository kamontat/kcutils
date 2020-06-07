import { resolve } from "path";

import { getPackages } from "@lerna/project";
import { Graph } from "../models/Graph";
import { Dependencies } from "../models/dependencies/Dependencies";
import { InternalDependencies } from "../models/dependencies/InternalDependency";
import { ExternalDependencies } from "../models/dependencies/ExternalDependency";
import { Classify } from "../models/query/Classify";

import { externalClassify, internalClassify } from "../settings";

export interface ServiceOptions {
  root: string;
  name: string;
  internal: Classify;
  external: Classify;
}

export type OptionalServiceOptions = Partial<ServiceOptions>;

const defaultOptions: ServiceOptions = {
  root: resolve(process.cwd(), "..", "..", ".."),
  name: "Deps",
  external: externalClassify,
  internal: internalClassify,
};

export class DependencyServices {
  private options: ServiceOptions;

  constructor(opts: OptionalServiceOptions) {
    this.options = Object.assign({}, defaultOptions, opts);
  }

  async graph() {
    const packages = await getPackages(this.options.root);
    const dependencies = new Dependencies();

    const graph = new Graph(this.options.name);

    packages.forEach(p => dependencies.add(InternalDependencies.from(internalClassify, p)));
    packages.forEach(p => {
      const d = dependencies.get(p.name);
      if (d) {
        const deps = ExternalDependencies.from(externalClassify, p.dependencies || {}, dependencies);
        const devDeps = ExternalDependencies.from(externalClassify, p.devDependencies || {}, dependencies);
        const peerDeps = ExternalDependencies.from(externalClassify, p.peerDependencies || {}, dependencies);

        deps.forEach(dd => d.addDependOn(dd));
        devDeps.forEach(dd => d.addDevDependOn(dd));
        peerDeps.forEach(dd => d.addPeerDependOn(dd));
      }
    });

    graph.visualize(dependencies);
    return graph;
  }
}
