import { getPackages } from "@lerna/project";

import { Graph } from "../models/Graph";
import { Dependencies } from "../models/dependencies/Dependencies";
import { InternalDependencies } from "../models/dependencies/InternalDependency";
import { ExternalDependencies } from "../models/dependencies/ExternalDependency";

import { ServiceOption, OptionalServiceOption } from "./models/Option";

import { options } from "./constants/option";

export class DependencyServices {
  private options: ServiceOption;

  constructor(opts: OptionalServiceOption) {
    this.options = Object.assign({}, options, opts);
  }

  async graph() {
    const packages = await getPackages(this.options.root);
    const dependencies = new Dependencies();

    const graph = new Graph(this.options.name);

    packages.forEach(p => dependencies.add(InternalDependencies.from(this.options.internal, p)));
    packages.forEach(p => {
      const d = dependencies.get(p.name);
      if (d) {
        const deps = ExternalDependencies.from(this.options.external, p.dependencies || {}, dependencies);
        const devDeps = ExternalDependencies.from(this.options.external, p.devDependencies || {}, dependencies);
        const peerDeps = ExternalDependencies.from(this.options.external, p.peerDependencies || {}, dependencies);

        deps.forEach(dd => d.addDependOn(dd));
        devDeps.forEach(dd => d.addDevDependOn(dd));
        peerDeps.forEach(dd => d.addPeerDependOn(dd));
      }
    });

    graph.visualize(dependencies);
    return graph;
  }
}
